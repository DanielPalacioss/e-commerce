package com.daniel.ecommerce.order.service;

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
import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.service.ProductService;
import com.daniel.ecommerce.product.service.ProductStockService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;
    private final ProductStockService productStockService;

    public OrderServiceImpl(OrderRepository orderRepository, UserService userService, ProductService productService, ProductStockService productStockService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
        this.productStockService = productStockService;
    }

    @Override
    public OrderPageResponseDTO getOrderPageByFiltersMe(Pageable pageable, OrderStatuses status, UUID userId) {
        Page<Order> orderPage;
        if (status == null) {
            orderPage = orderRepository.findAllByUser_Id(userId, pageable);
        } else {
            orderPage = orderRepository.findAllByStatusAndUser_Id(status, userId, pageable);
        }

        List<OrderResponseDTO> orders = orderPage.stream().map(order -> new OrderResponseDTO(order)).toList();
        return OrderPageResponseDTO.builder()
                .orders(orders)
                .page(orderPage.getNumber())
                .totalPages(orderPage.getTotalPages())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .build();
    }

    @Override
    public OrderPageResponseDTO getOrderPageWithFilters(Pageable pageable, OrderStatuses status, UUID userId) {
        userService.getUserById(userId);  // Verify user exists
        Page<Order> orderPage;
        if (status == null) {
            orderPage = orderRepository.findAllByUser_Id(userId, pageable);
        } else {
            orderPage = orderRepository.findAllByStatusAndUser_Id(status, userId, pageable);
        }

        List<OrderResponseDTO> orders = orderPage.stream().map(order -> new OrderResponseDTO(order)).toList();
        return OrderPageResponseDTO.builder()
                .orders(orders)
                .page(orderPage.getNumber())
                .totalPages(orderPage.getTotalPages())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .build();
    }

    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO, UUID userId) {
        //Creo la orden sin objeto para asignarle la referencia a cada items
        Order order = new Order();
        order.setUser(UserEntity.builder().id(userId).build());
        order.setStatus(OrderStatuses.PENDING);
        order.setShippingAddress(UserAddress.builder().id(orderRequestDTO.shippingAddressId()).build());

        OrderCalculationResult calc = buildOrderItemsAndTotal(orderRequestDTO, order);
        order.setTotalPrice(calc.total());
        order.setItems(calc.items());

        orderRepository.save(order);
        return new OrderResponseDTO(order);
    }

    @Transactional
    @Override
    public OrderResponseDTO updateOrder(UUID orderId, OrderRequestDTO orderRequestDTO, UUID userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getUser().getId().equals(userId)) {
            throw new ConflictException("The order does not belong to the user");
        }

        if (!OrderStatuses.PENDING.equals(order.getStatus())) {
            throw new ConflictException("Only orders with status PENDING can be updated");
        }

        OrderCalculationResult calc = buildOrderItemsAndTotal(orderRequestDTO, order);

        // Actualizar items de la orden
        order.getItems().clear(); // elimina los antiguos (Hibernate marcará los huérfanos)
        for (OrderItem newItem : calc.items()) {
            order.getItems().add(newItem);      // agregar a la lista existente
        }

        // Actualizar datos de la orden
        order.setShippingAddress(UserAddress.builder().id(orderRequestDTO.shippingAddressId()).build());
        order.setTotalPrice(calc.total());
        order.setUser(UserEntity.builder().id(userId).build());

        orderRepository.save(order);

        return new OrderResponseDTO(order);
    }

    @Override
    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    @Override
    public void cancelOrder(UUID orderId, UUID userId) {
        Order order = validateOrder(orderId, userId);
        order.setStatus(OrderStatuses.CANCELLED);
        orderRepository.save(order);
    }

    private Order validateOrder(UUID orderId, UUID userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getUser().getId().equals(userId)) {
            throw new ConflictException("The order does not belong to the user");
        }
        if (!OrderStatuses.PENDING.equals(order.getStatus())) {
            throw new ConflictException("Only orders with status PENDING can be canceled");
        }
        return order;
    }

    @Transactional
    @Override
    public void confirmOrder(UUID orderId, UUID userId) {
        Order order = validateOrder(orderId, userId);

        for (OrderItem item : order.getItems()) {
            productStockService.decreaseProductStock(item.getQuantity(), item.getProduct().getId());
        }
        order.setStatus(OrderStatuses.CONFIRMED);
        orderRepository.save(order);
    }

    private OrderCalculationResult buildOrderItemsAndTotal(OrderRequestDTO orderRequestDTO, Order order) {
        List<OrderItem> orderItems = new ArrayList<>();
        List<UUID> productIds = orderRequestDTO.items().stream()
                .map(OrderItemRequestDTO::getProductId)
                .toList();

        Map<UUID, OrderItemRequestDTO> itemsMap = orderRequestDTO.items()
                .stream()
                .collect(Collectors.toMap(OrderItemRequestDTO::getProductId, Function.identity()));

        List<Product> products = productService.findAllByIdIn(productIds);
        if (products.size() != productIds.size()) {
            throw new ConflictException("Some products do not exist");
        }

        BigDecimal total = BigDecimal.ZERO;

        for (Product product : products) {
            BigDecimal price = product.getPrice();

            OrderItemRequestDTO orderItemRequest = itemsMap.get(product.getId());
            if (orderItemRequest.getQuantity() <= 0) {
                throw new ConflictException("Quantity must be greater than 0");
            }
            if(product.getProductStock().getQuantity() < orderItemRequest.getQuantity()){
                throw new ConflictException("The product " + product.getName() + " does not have enough stock");
            }
            orderItems.add(OrderItem.builder()
                    .id(null)
                    .product(product)
                    .quantity(orderItemRequest.getQuantity())
                    .price(price)
                    .order(order)
                    .build());

            total = total.add(price.multiply(BigDecimal.valueOf(orderItemRequest.getQuantity())));
        }

        return new OrderCalculationResult(orderItems, total);
    }

    private record OrderCalculationResult(List<OrderItem> items, BigDecimal total) {
    }
}
