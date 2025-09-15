// Archivo de test sugerido: OrderServiceImplTest.java
// Ajusta el package a tu estructura real, por ejemplo: package com.daniel.ecommerce.order.service;
package com.daniel.ecommerce;

import com.daniel.ecommerce.auth.entity.UserAddress;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.service.UserService;
import com.daniel.ecommerce.order.dto.request.OrderItemRequestDTO;
import com.daniel.ecommerce.order.dto.request.OrderRequestDTO;
import com.daniel.ecommerce.order.dto.response.OrderPageResponseDTO;
import com.daniel.ecommerce.order.dto.response.OrderResponseDTO;
import com.daniel.ecommerce.order.entity.Order;
import com.daniel.ecommerce.order.entity.OrderItem;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import com.daniel.ecommerce.order.repository.OrderRepository;
import com.daniel.ecommerce.order.service.OrderServiceImpl;
import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.service.ProductService;
import com.daniel.ecommerce.product.service.ProductStockService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserService userService;
    @Mock
    private ProductService productService;
    @Mock
    private ProductStockService productStockService;

    @InjectMocks
    private OrderServiceImpl orderService;


    private UUID userId;
    private UUID addressId;
    private UUID orderId;
    private UUID productId1;
    private UUID productId2;

    @BeforeEach
    void init() {
        userId = UUID.randomUUID();
        addressId = UUID.randomUUID();
        orderId = UUID.randomUUID();
        productId1 = UUID.randomUUID();
        productId2 = UUID.randomUUID();
    }

    private Product buildProduct(UUID id, BigDecimal price) {
        Product p = new Product();

        try {
            var idField = Product.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(p, id);
        } catch (Exception ignored) {}
        try {
            var priceField = Product.class.getDeclaredField("price");
            priceField.setAccessible(true);
            priceField.set(p, price);
        } catch (Exception ignored) {}

        // IMPORTANTE: setear el stock para evitar NPE en ProductResponseDTO
        try {
            var stockClass = Class.forName("com.daniel.ecommerce.product.entity.ProductStock");
            Object stock = stockClass.getDeclaredConstructor().newInstance();

            var quantityField = stockClass.getDeclaredField("quantity");
            quantityField.setAccessible(true);
            quantityField.set(stock, 999); // cantidad dummy para test

            var productFieldInStock = stockClass.getDeclaredField("product");
            productFieldInStock.setAccessible(true);
            productFieldInStock.set(stock, p);

            var productStockField = Product.class.getDeclaredField("productStock");
            productStockField.setAccessible(true);
            productStockField.set(p, stock);
        } catch (Exception ignored) {}

        // IMPORTANTE: setear active=true para evitar NPE en ProductResponseDTO (booleanValue sobre null)
        try {
            var activeField = Product.class.getDeclaredField("active");
            activeField.setAccessible(true);
            activeField.set(p, Boolean.TRUE);
        } catch (Exception ignored) {}

        return p;
    }



    private Order buildExistingOrder(UUID id, UUID ownerId, OrderStatuses status) {
        Order order = Order.builder()
                .id(id)
                .user(UserEntity.builder().id(ownerId).build())
                .shippingAddress(UserAddress.builder().id(addressId).build())
                .status(status)
                .totalPrice(new BigDecimal("100.00"))
                .items(List.of(
                        OrderItem.builder()
                                .product(buildProduct(productId1, new BigDecimal("10.00")))
                                .quantity(5)
                                .price(new BigDecimal("10.00"))
                                .build()
                ))
                .build();
        // set createdAt para evitar NPE en DTO
        try {
            var createdAtField = Order.class.getDeclaredField("createdAt");
            createdAtField.setAccessible(true);
            createdAtField.set(order, LocalDateTime.now());
        } catch (Exception ignored) {}
        return order;
    }

    private OrderRequestDTO buildOrderRequest(UUID addrId, Map<UUID, Integer> items) {
        HashSet<OrderItemRequestDTO> set = new HashSet<>();
        for (var e : items.entrySet()) {
            OrderItemRequestDTO item = new OrderItemRequestDTO();
            item.setProductId(e.getKey());
            item.setQuantity(e.getValue());
            set.add(item);
        }
        return OrderRequestDTO.builder()
                .shippingAddressId(addrId)
                .items(set)
                .build();
    }

    @Test
    void createOrder_ok_calculaTotal_y_guarda() {
        // Arrange
        var req = buildOrderRequest(addressId, Map.of(
                productId1, 2,
                productId2, 3
        ));
        Product prod1 = buildProduct(productId1, new BigDecimal("10.50"));
        Product prod2 = buildProduct(productId2, new BigDecimal("20.00"));

        when(productService.findAllByIdIn(anyList())).thenReturn(List.of(prod1, prod2));
        // Capturamos el Order que se guarda
        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);

        // Act
        OrderResponseDTO resp = orderService.createOrder(req, userId);

        // Assert
        verify(orderRepository).save(orderCaptor.capture());
        Order saved = orderCaptor.getValue();
        assertEquals(userId, saved.getUser().getId());
        assertEquals(addressId, saved.getShippingAddress().getId());
        assertEquals(OrderStatuses.PENDING, saved.getStatus());
        // Total: 2 * 10.50 + 3 * 20.00 = 21.00 + 60.00 = 81.00
        assertEquals(new BigDecimal("81.00"), saved.getTotalPrice());
        assertEquals(2, saved.getItems().size());

        // El DTO debe reflejar el mismo total/estado
        assertEquals(OrderStatuses.PENDING, resp.status());
        assertEquals(new BigDecimal("81.00"), resp.totalPrice());
        assertEquals(userId, resp.user());
        assertNotNull(resp.shippingAddress());
    }

    @Test
    void createOrder_falla_si_producto_no_existe() {
        // Arrange
        var req = buildOrderRequest(addressId, Map.of(productId1, 1, productId2, 1));
        // Devuelve menos productos que ids solicitados
        when(productService.findAllByIdIn(anyList())).thenReturn(List.of(buildProduct(productId1, new BigDecimal("10"))));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.createOrder(req, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void createOrder_falla_si_quantity_invalida() {
        // Arrange
        var req = buildOrderRequest(addressId, Map.of(productId1, 0)); // Cantidad 0
        when(productService.findAllByIdIn(anyList()))
                .thenReturn(List.of(buildProduct(productId1, new BigDecimal("5.00"))));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.createOrder(req, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void updateOrder_ok_con_status_PENDING_y_mismo_usuario() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        var req = buildOrderRequest(addressId, Map.of(productId1, 1, productId2, 2));
        when(productService.findAllByIdIn(anyList()))
                .thenReturn(List.of(
                        buildProduct(productId1, new BigDecimal("9.00")),
                        buildProduct(productId2, new BigDecimal("3.50"))
                ));
        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);

        // Act
        OrderResponseDTO resp = orderService.updateOrder(orderId, req, userId);

        // Assert
        verify(orderRepository).save(orderCaptor.capture());
        Order saved = orderCaptor.getValue();
        // Total: 1*9 + 2*3.5 = 9 + 7 = 16
        assertEquals(new BigDecimal("16.00"), saved.getTotalPrice());
        assertEquals(2, saved.getItems().size());
        assertEquals(userId, saved.getUser().getId());
        assertEquals(OrderStatuses.PENDING, saved.getStatus());
        assertEquals(new BigDecimal("16.00"), resp.totalPrice());
    }

    @Test
    void updateOrder_falla_si_orden_no_existe() {
        // Arrange
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        // Act + Assert
        assertThrows(ResourceNotFoundException.class,
                () -> orderService.updateOrder(orderId, buildOrderRequest(addressId, Map.of()), userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void updateOrder_falla_si_otro_usuario() {
        // Arrange
        UUID otherUser = UUID.randomUUID();
        Order existing = buildExistingOrder(orderId, otherUser, OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class,
                () -> orderService.updateOrder(orderId, buildOrderRequest(addressId, Map.of()), userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void updateOrder_falla_si_status_no_PENDING() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.CONFIRMED);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class,
                () -> orderService.updateOrder(orderId, buildOrderRequest(addressId, Map.of()), userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void getOrderById_ok() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act
        Order result = orderService.getOrderById(orderId);

        // Assert
        assertEquals(orderId, result.getId());
    }

    @Test
    void getOrderById_falla_si_no_existe() {
        // Arrange
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        // Act + Assert
        assertThrows(ResourceNotFoundException.class, () -> orderService.getOrderById(orderId));
    }

    @Test
    void cancelOrder_ok() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act
        orderService.cancelOrder(orderId, userId);

        // Assert
        assertEquals(OrderStatuses.CANCELLED, existing.getStatus());
        verify(orderRepository).save(existing);
    }

    @Test
    void cancelOrder_falla_si_otro_usuario() {
        // Arrange
        Order existing = buildExistingOrder(orderId, UUID.randomUUID(), OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.cancelOrder(orderId, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void cancelOrder_falla_si_no_PENDING() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.CONFIRMED);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.cancelOrder(orderId, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void confirmOrder_ok() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act
        orderService.confirmOrder(orderId, userId);

        // Assert
        assertEquals(OrderStatuses.CONFIRMED, existing.getStatus());
        verify(productStockService).decreaseProductStock(eq(5), eq(productId1));
        verify(orderRepository).save(existing);
    }


    @Test
    void confirmOrder_falla_si_otro_usuario() {
        // Arrange
        Order existing = buildExistingOrder(orderId, UUID.randomUUID(), OrderStatuses.PENDING);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.confirmOrder(orderId, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void confirmOrder_falla_si_no_PENDING() {
        // Arrange
        Order existing = buildExistingOrder(orderId, userId, OrderStatuses.CANCELLED);
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existing));

        // Act + Assert
        assertThrows(ConflictException.class, () -> orderService.confirmOrder(orderId, userId));
        verify(orderRepository, never()).save(any());
    }

    @Test
    void getOrderPageByFiltersMe_ok_sin_status() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10, Sort.by("createdAt").descending());
        List<Order> content = List.of(buildExistingOrder(UUID.randomUUID(), userId, OrderStatuses.PENDING));
        when(orderRepository.findAllByUser_Id(eq(userId), eq(pageable)))
                .thenReturn(new PageImpl<>(content, pageable, 1));

        // Act
        OrderPageResponseDTO page = orderService.getOrderPageByFiltersMe(pageable, null, userId);

        // Assert
        assertEquals(1, page.totalElements());
        assertEquals(1, page.orders().size());
        verify(orderRepository).findAllByUser_Id(userId, pageable);
        verify(orderRepository, never()).findAllByStatusAndUser_Id(any(), any(), any());
    }

    @Test
    void getOrderPageByFiltersMe_ok_con_status() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10);
        List<Order> content = List.of(buildExistingOrder(UUID.randomUUID(), userId, OrderStatuses.CONFIRMED));
        when(orderRepository.findAllByStatusAndUser_Id(eq(OrderStatuses.CONFIRMED), eq(userId), eq(pageable)))
                .thenReturn(new PageImpl<>(content, pageable, 1));

        // Act
        OrderPageResponseDTO page = orderService.getOrderPageByFiltersMe(pageable, OrderStatuses.CONFIRMED, userId);

        // Assert
        assertEquals(1, page.orders().size());
        verify(orderRepository).findAllByStatusAndUser_Id(OrderStatuses.CONFIRMED, userId, pageable);
    }

    @Test
    void getOrderPageWithFilters_ok_verifica_existencia_usuario_y_lista() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 5);
        when(userService.getUserById(userId)).thenReturn(UserEntity.builder().id(userId).build());
        List<Order> content = List.of(buildExistingOrder(UUID.randomUUID(), userId, OrderStatuses.PENDING));
        when(orderRepository.findAllByUser_Id(eq(userId), eq(pageable)))
                .thenReturn(new PageImpl<>(content, pageable, 1));

        // Act
        OrderPageResponseDTO page = orderService.getOrderPageWithFilters(pageable, null, userId);

        // Assert
        verify(userService).getUserById(userId);
        assertEquals(1, page.totalElements());
        verify(orderRepository).findAllByUser_Id(userId, pageable);
    }

}
