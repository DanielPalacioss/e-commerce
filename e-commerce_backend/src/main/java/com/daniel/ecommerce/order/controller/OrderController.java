package com.daniel.ecommerce.order.controller;

import com.daniel.ecommerce.order.dto.request.OrderRequestDTO;
import com.daniel.ecommerce.order.dto.response.OrderPageResponseDTO;
import com.daniel.ecommerce.order.dto.response.OrderResponseDTO;
import com.daniel.ecommerce.order.enums.OrderSortForField;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import com.daniel.ecommerce.order.enums.PaymentMethod;
import com.daniel.ecommerce.order.service.OrderService;
import com.daniel.ecommerce.product.enums.SortDirection;
import com.daniel.ecommerce.shared.security.user.CurrentUser;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/me")
    public ResponseEntity<OrderPageResponseDTO> getOrderPageByFiltersMe(
            @CurrentUser CustomPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) OrderStatuses orderStatuses,
            @RequestParam(defaultValue = "createdAt") OrderSortForField field,
            @RequestParam(defaultValue = "asc") SortDirection direction) {
        Pageable pageable;
        if (SortDirection.asc.equals(direction)) {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).descending());
        }
        OrderPageResponseDTO orderPageResponse = orderService.getOrderPageByFiltersMe(pageable, orderStatuses, UUID.fromString(principal.userId()));
        return ResponseEntity.ok(orderPageResponse);
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity<OrderPageResponseDTO> getOrderPageWithFilters(
            @PathVariable("user_id") UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) OrderStatuses orderStatuses,
            @RequestParam(defaultValue = "createdAt") OrderSortForField field,
            @RequestParam(defaultValue = "asc") SortDirection direction) {
        Pageable pageable;
        if (SortDirection.asc.equals(direction)) {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).descending());
        }
        OrderPageResponseDTO orderPageResponse = orderService.getOrderPageByFiltersMe(pageable, orderStatuses, userId);
        return ResponseEntity.ok(orderPageResponse);
    }

    @PostMapping("/me")
    ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO orderRequestDTO, @CurrentUser CustomPrincipal principal) {
        OrderResponseDTO orderResponseDTO = orderService.createOrder(orderRequestDTO, UUID.fromString(principal.userId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(orderResponseDTO);
    }

    @PatchMapping("/{order_id}/me")
    ResponseEntity<OrderResponseDTO> updateOrder(@CurrentUser CustomPrincipal principal, @PathVariable("order_id") UUID orderId, @Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        OrderResponseDTO orderResponseDTO = orderService.updateOrder(orderId, orderRequestDTO, UUID.fromString(principal.userId()));
        return ResponseEntity.ok(orderResponseDTO);
    }

    @PostMapping("/{order_id}/cancel/me")
    ResponseEntity<String> cancelOrder(@CurrentUser CustomPrincipal principal, @PathVariable("order_id") UUID orderId) {
        orderService.cancelOrder(orderId, UUID.fromString(principal.userId()));
        return ResponseEntity.ok("Order cancelled successfully");
    }

}
