package com.daniel.ecommerce.order.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Builder
public record OrderRequestDTO(
        @NotNull(message = "Shipping address ID cannot be null")
        UUID shippingAddressId,
        @Valid Set<OrderItemRequestDTO> items
) {
}
