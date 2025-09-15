package com.daniel.ecommerce.order.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Data
public class OrderItemRequestDTO {

    @JsonProperty(required = false)
    UUID orderId;
    UUID productId;
    @Min(1)
    Integer quantity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItemRequestDTO that)) return false;
        return Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }
}
