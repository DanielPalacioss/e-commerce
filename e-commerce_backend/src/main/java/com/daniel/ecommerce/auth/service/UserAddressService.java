package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UserAddressRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserAddressResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UserAddressService {

    List<UserAddressResponseDTO> getUserAddressesByUserId(UUID userId);

    UserAddressResponseDTO createUserAddress(UUID userId, UserAddressRequestDTO userAddressRequestDTO);

    UserAddressResponseDTO updateUserAddress(UUID userId, UUID userAddressId, UserAddressRequestDTO userAddressRequestDTO);

    void deleteUserAddress(UUID userId, UUID userAddressId);
}
