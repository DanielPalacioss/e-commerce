package com.daniel.ecommerce.order.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record InvoicePageResponseDTO(
        List<InvoiceResponseDTO> invoices,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
