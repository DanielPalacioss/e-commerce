package com.daniel.ecommerce.order.dto.response;

import com.daniel.ecommerce.order.entity.OrderItem;
import com.daniel.ecommerce.product.dto.response.ProductResponseDTO;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemResponseDTO(

        Integer id,
        ProductResponseDTO product,
        Integer quantity,
        BigDecimal price
) {
    public OrderItemResponseDTO(OrderItem orderItem) {
        this(
                orderItem.getId(),
                new ProductResponseDTO(orderItem.getProduct()),
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }
}
