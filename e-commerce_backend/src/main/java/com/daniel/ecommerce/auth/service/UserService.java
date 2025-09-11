package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserResponseDTO getUserByUsername(String username);
    UserResponseDTO updateUser(String username, UpdateUserRequestDTO updateUserRequestDTO);
    String updateUserProfilePicture(String username, MultipartFile file);
    String updateUserPassword(String username, String OldPassword, String newPassword);

}
