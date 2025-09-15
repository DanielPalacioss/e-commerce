package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UpdateUserPasswordRequestDTO;
import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.repository.UserRepository;
import com.daniel.ecommerce.shared.cloudinary.service.CloudinaryService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, CloudinaryService cloudinaryService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public UserResponseDTO getUserByUsername(String username) {
        UserEntity user = getUserEntityByUsername(username);
        return new UserResponseDTO(user);
    }

    @Override
    public UserResponseDTO updateUser(String username, UpdateUserRequestDTO updateUserRequestDTO) {
        UserEntity user = getUserEntityByUsername(username);
        user.setName(updateUserRequestDTO.name());
        user.setEmail(updateUserRequestDTO.email());

        UserEntity updatedUser = userRepository.save(user);

        return new UserResponseDTO(updatedUser);
    }

    @Override
    public String uploadUserProfilePicture(String username, MultipartFile file) {
        UserEntity user = getUserEntityByUsername(username);
        Map<String, String> result = cloudinaryService.uploadOrReplaceFile(user.getProfilePicturePublicId(),
                file, "users");

        if (user.getProfilePicturePublicId() == null || user.getProfilePicturePublicId().isEmpty()) {
            user.setProfilePicturePublicId(result.get("publicId"));
        }
        user.setProfilePictureUrl(result.get("url"));

        userRepository.save(user);
        return user.getProfilePictureUrl();
    }

    @Override
    public String updateUserPassword(String username, UpdateUserPasswordRequestDTO passwordRequest) {
        UserEntity user = getUserEntityByUsername(username);
        if (!passwordEncoder.matches(passwordRequest.oldPassword(), user.getPassword())) {
            throw new ConflictException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(passwordRequest.newPassword()));
        userRepository.save(user);
        return "Password updated successfully";
    }

    private UserEntity getUserEntityByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
    }
}
