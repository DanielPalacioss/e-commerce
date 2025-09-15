package com.daniel.ecommerce.auth.dto.response;

import com.daniel.ecommerce.auth.entity.UserAddress;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserAddressResponseDTO(
        UUID id,
        String fullName,
        String phone,
        String addressLine,
        String city,
        String state,
        String postalCode,
        String country
) {
    public UserAddressResponseDTO(UserAddress userAddress) {
        this(
                userAddress.getId(),
                userAddress.getFullName(),
                userAddress.getPhone(),
                userAddress.getAddressLine(),
                userAddress.getCity(),
                userAddress.getState(),
                userAddress.getPostalCode(),
                userAddress.getCountry()
        );
    }
}
