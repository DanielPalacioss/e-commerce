package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.repository.UserRepository;
import com.daniel.ecommerce.shared.cloudinary.service.CloudinaryService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

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
    public UserResponseDTO getUserByUsername(String username) {
        UserEntity user = getUserEntityByUsername(username);
        return new UserResponseDTO(user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getProfilePictureUrl()
        );
    }

    @Override
    public UserResponseDTO updateUser(String username, UpdateUserRequestDTO updateUserRequestDTO) {
        UserEntity user = getUserEntityByUsername(username);
        user.setName(updateUserRequestDTO.name());
        user.setEmail(updateUserRequestDTO.email());

        UserEntity updatedUser = userRepository.save(user);

        return new UserResponseDTO(updatedUser.getUsername(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getProfilePictureUrl()
        );
    }

    @Override
    public String updateUserProfilePicture(String username, MultipartFile file) {
        UserEntity user = getUserEntityByUsername(username);
        Map<String, String> result = new HashMap<>();

        String profilePictureUrlExist = user.getProfilePictureUrl();
        if(profilePictureUrlExist == null || !profilePictureUrlExist.isEmpty()){
            result = cloudinaryService.uploadOrReplaceFile(null, file, "users");
            user.setProfilePicturePublicId(result.get("public_id"));
            user.setProfilePictureUrl(result.get("secure_url"));
        }
        else{
            result = cloudinaryService.uploadOrReplaceFile(user.getProfilePicturePublicId(), file, "users");
            user.setProfilePicturePublicId(result.get("public_id"));
            user.setProfilePictureUrl(result.get("secure_url"));
        }
        userRepository.save(user);

        return user.getProfilePictureUrl();
    }

    @Override
    public String updateUserPassword(String username, String OldPassword, String newPassword) {
        UserEntity user = getUserEntityByUsername(username);
        if(!passwordEncoder.matches(OldPassword, user.getPassword())){
            throw new ConflictException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password updated successfully";
    }

    private UserEntity getUserEntityByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User with username "+username+" not found"));
    }
}
