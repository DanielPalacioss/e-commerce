package com.daniel.ecommerce.auth.dto.response;

public record UserResponseDTO(
        String name,
        String email,
        String username,
        String profilePictureUrl
) {}
