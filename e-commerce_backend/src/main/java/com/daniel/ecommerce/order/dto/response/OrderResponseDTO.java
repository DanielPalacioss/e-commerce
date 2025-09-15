package com.daniel.ecommerce.order.dto.response;

import com.daniel.ecommerce.auth.dto.response.UserAddressResponseDTO;
import com.daniel.ecommerce.order.entity.Order;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record OrderResponseDTO(
        UUID id,
        UUID user,
        UserAddressResponseDTO shippingAddress,
        BigDecimal totalPrice,
        OrderStatuses status,
        List<OrderItemResponseDTO> items,
        LocalDateTime createdAt
) {
    public OrderResponseDTO(Order order) {
        this(
                order.getId(),
                order.getUser().getId(),
                new UserAddressResponseDTO(order.getShippingAddress()),
                order.getTotalPrice(),
                order.getStatus(),
                order.getItems().stream().map(item -> new OrderItemResponseDTO(item)).toList(),
                order.getCreatedAt()
        );
    }
}
