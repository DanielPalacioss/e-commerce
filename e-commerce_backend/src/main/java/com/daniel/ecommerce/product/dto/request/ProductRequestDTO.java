package com.daniel.ecommerce.product.dto.request;

import com.daniel.ecommerce.product.enums.ProductCategories;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductRequestDTO(
        @Size(min = 3, max = 25, message = "Name must be between 3 and 25 characters")
        @NotBlank(message = "Name cannot be blank or null")
        String name,

        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,

        @NotNull(message = "Price cannot be null")
        @DecimalMin(value = "0.01", inclusive = true, message = "Price must be at least 0.01")
        BigDecimal price,

        @NotNull(message = "Category cannot be null")
        ProductCategories category
) {
}
