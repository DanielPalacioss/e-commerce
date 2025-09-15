package com.daniel.ecommerce.order.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record OrderPageResponseDTO(
        List<OrderResponseDTO> orders,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
