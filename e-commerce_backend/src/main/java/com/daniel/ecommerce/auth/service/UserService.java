package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UpdateUserPasswordRequestDTO;
import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import com.daniel.ecommerce.auth.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface UserService {

    UserEntity getUserById(UUID id);

    UserResponseDTO getUserByUsername(String username);

    UserResponseDTO updateUser(String username, UpdateUserRequestDTO updateUserRequestDTO);

    String uploadUserProfilePicture(String username, MultipartFile file);

    String updateUserPassword(String username, UpdateUserPasswordRequestDTO passwordRequest);

}
