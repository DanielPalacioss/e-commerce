package com.daniel.ecommerce.auth.dto.response;

import com.daniel.ecommerce.auth.entity.UserEntity;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        String username,
        String profilePictureUrl
) {
    public UserResponseDTO(UserEntity userEntity) {
        this(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getEmail(),
                userEntity.getUsername(),
                userEntity.getProfilePictureUrl()
        );
    }
}
