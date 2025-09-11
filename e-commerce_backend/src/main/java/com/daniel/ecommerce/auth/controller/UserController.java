package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.auth.dto.request.UpdateUserRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserResponseDTO;
import com.daniel.ecommerce.auth.service.UserService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

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
    public ResponseEntity<UserResponseDTO> getCurrentUser(Principal principal) {
        UserResponseDTO userResponseDTO = userService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(userResponseDTO);
    }

    @PatchMapping("/{username}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable String username, @RequestBody UpdateUserRequestDTO updateUserRequestDTO) {
        UserResponseDTO updatedUser = userService.updateUser(username, updateUserRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(Principal principal, @RequestBody UpdateUserRequestDTO updateUserRequestDTO) {
        UserResponseDTO updatedUser = userService.updateUser(principal.getName(), updateUserRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{username}/change-password")
    public ResponseEntity<String> changeUserPassword(@PathVariable String username, @RequestParam String oldPassword, @RequestParam String newPassword) {
        String response = userService.updateUserPassword(username, oldPassword, newPassword);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me/change-password")
    public ResponseEntity<String> changeCurrentUserPassword(Principal principal, @RequestParam String oldPassword, @RequestParam String newPassword) {
        String response = userService.updateUserPassword(principal.getName(), oldPassword, newPassword);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{username}/profile-picture")
    public ResponseEntity<String> updateUserProfilePicture(@PathVariable String username, @RequestParam("file") MultipartFile file) {
        String imageUrl = userService.updateUserProfilePicture(username, file);
        return ResponseEntity.ok(imageUrl);
    }

    @PatchMapping("/me/profile-picture")
    public ResponseEntity<String> updateUserProfilePicture(Principal principal, @RequestParam("file") MultipartFile file) {
        String imageUrl = userService.updateUserProfilePicture(principal.getName(), file);
        return ResponseEntity.ok(imageUrl);
    }

}
