package com.daniel.ecommerce.product.dto.response;

import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.enums.ProductCategories;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductResponseDTO(
        UUID id,
        String name,
        String description,
        Integer quantity,
        BigDecimal price,
        String imageUrl,
        ProductCategories category,
        boolean active
) {
    public ProductResponseDTO(Product product) {
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getProductStock().getQuantity(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory(),
                product.getActive().booleanValue()
        );
    }
}
