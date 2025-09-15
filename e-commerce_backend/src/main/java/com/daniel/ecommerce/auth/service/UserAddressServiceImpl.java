package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UserAddressRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserAddressResponseDTO;
import com.daniel.ecommerce.auth.entity.UserAddress;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.repository.UserAddressRepository;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserAddressServiceImpl implements UserAddressService {

    private final UserAddressRepository userAddressRepository;
    private final int MAX_ADDRESSES_PER_USER = 3;

    public UserAddressServiceImpl(UserAddressRepository userAddressRepository) {
        this.userAddressRepository = userAddressRepository;
    }

    @Override
    public List<UserAddressResponseDTO> getUserAddressesByUserId(UUID userId) {
        List<UserAddressResponseDTO> userAddresses = userAddressRepository.findAllByUser_Id(userId)
                .stream()
                .map(address -> new UserAddressResponseDTO(address)).toList();
        return userAddresses;
    }

    @Override
    public UserAddressResponseDTO createUserAddress(UUID userId, UserAddressRequestDTO userAddressRequestDTO) {
        int userTotalAddress = userAddressRepository.countUserAddressByUser_Id(userId);
        if (userTotalAddress == MAX_ADDRESSES_PER_USER) {
            throw new ConflictException("You cannot add more addresses, the maximum is 3");
        }


        UserAddress userAddress = UserAddress.builder()
                .id(null)
                .user(UserEntity.builder().id(userId).build()) // Se utiliza patron builder para construir solo con ID
                .addressLine(userAddressRequestDTO.addressLine())
                .fullName(userAddressRequestDTO.fullName())
                .phone(userAddressRequestDTO.phone())
                .addressLine(userAddressRequestDTO.addressLine())
                .city(userAddressRequestDTO.city())
                .state(userAddressRequestDTO.state())
                .postalCode(userAddressRequestDTO.postalCode())
                .country(userAddressRequestDTO.country())
                .build();
        userAddressRepository.save(userAddress);
        return new UserAddressResponseDTO(userAddress);
    }

    @Override
    public UserAddressResponseDTO updateUserAddress(UUID userId, UUID userAddressId, UserAddressRequestDTO userAddressRequestDTO) {
        UserAddress userAddress = userAddressRepository.findById(userAddressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address with id " + userAddressId + " not found"));
        if (!userAddress.getUser().getId().equals(userId)) throw new ConflictException("The address does not belong to the user");
        userAddress.setAddressLine(userAddress.getAddressLine());
        userAddress.setFullName(userAddressRequestDTO.fullName());
        userAddress.setPhone(userAddressRequestDTO.phone());
        userAddress.setCity(userAddressRequestDTO.city());
        userAddress.setState(userAddressRequestDTO.state());
        userAddress.setPostalCode(userAddress.getPostalCode());
        userAddress.setCountry(userAddressRequestDTO.country());

        userAddressRepository.save(userAddress);
        return new UserAddressResponseDTO(userAddress);
    }

    @Override
    public void deleteUserAddress(UUID userId, UUID userAddressId) {
        UUID addressUserId = userAddressRepository.findById(userAddressId).orElseThrow(() -> new ResourceNotFoundException("Address with id " + userAddressId + " not found")).getUser().getId();
        if (!addressUserId.equals(userId)) throw new ConflictException("The address does not belong to the user");
        userAddressRepository.deleteById(userAddressId);
    }
}
