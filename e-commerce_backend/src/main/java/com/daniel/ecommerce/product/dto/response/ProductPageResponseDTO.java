package com.daniel.ecommerce.product.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ProductPageResponseDTO(
        List<ProductResponseDTO> products,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
