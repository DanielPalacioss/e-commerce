package com.daniel.ecommerce.order.dto.request;

import com.daniel.ecommerce.order.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record InvoiceRequest(
        @NotNull(message = "Order ID cannot be null")
        UUID orderId,
        @NotNull(message = "Payment method cannot be null")
        PaymentMethod paymentMethod
) {
}
