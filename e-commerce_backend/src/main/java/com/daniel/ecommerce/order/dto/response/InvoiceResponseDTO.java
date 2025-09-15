package com.daniel.ecommerce.order.dto.response;

import com.daniel.ecommerce.order.entity.Invoice;
import com.daniel.ecommerce.order.enums.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record InvoiceResponseDTO(
        UUID id,
        UUID orderId,
        BigDecimal totalAmount,
        PaymentMethod paymentMethod,
        LocalDateTime createdAt
) {
    public InvoiceResponseDTO(Invoice invoice) {
        this(
                invoice.getId(),
                invoice.getOrder().getId(),
                invoice.getTotalAmount(),
                invoice.getPaymentMethod(),
                invoice.getCreatedAt()
        );
    }
}
