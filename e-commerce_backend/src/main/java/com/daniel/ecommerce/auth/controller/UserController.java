package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.auth.dto.request.UpdateUserPasswordRequestDTO;
import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import com.daniel.ecommerce.auth.service.UserService;
import com.daniel.ecommerce.shared.security.user.CurrentUser;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@PathVariable String username) {
        UserResponseDTO userResponseDTO = userService.getUserByUsername(username);
        return ResponseEntity.ok(userResponseDTO);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(@CurrentUser CustomPrincipal principal) {
        UserResponseDTO userResponseDTO = userService.getUserByUsername(principal.username());
        return ResponseEntity.ok(userResponseDTO);
    }

    @PatchMapping("/{username}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable String username, @Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO) {
        UserResponseDTO updatedUser = userService.updateUser(username, updateUserRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(@CurrentUser CustomPrincipal principal, @Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO) {
        UserResponseDTO updatedUser = userService.updateUser(principal.username(), updateUserRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{username}/change-password")
    public ResponseEntity<String> changeUserPassword(@PathVariable String username, @Valid @RequestBody UpdateUserPasswordRequestDTO passwordRequest) {
        String response = userService.updateUserPassword(username, passwordRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me/change-password")
    public ResponseEntity<String> changeCurrentUserPassword(@CurrentUser CustomPrincipal principal, @Valid @RequestBody UpdateUserPasswordRequestDTO passwordRequest) {
        String response = userService.updateUserPassword(principal.username(), passwordRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{username}/profile-picture")
    public ResponseEntity<String> updateUserProfilePicture(@PathVariable String username, @RequestParam("file") MultipartFile file) {
        String imageUrl = userService.uploadUserProfilePicture(username, file);
        return ResponseEntity.ok(imageUrl);
    }

    @PatchMapping("/me/profile-picture")
    public ResponseEntity<String> updateUserProfilePicture(@CurrentUser CustomPrincipal principal, @RequestParam("file") MultipartFile file) {
        String imageUrl = userService.uploadUserProfilePicture(principal.username(), file);
        return ResponseEntity.ok(imageUrl);
    }

}
