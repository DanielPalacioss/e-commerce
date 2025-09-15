package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.auth.dto.request.UserAddressRequestDTO;
import com.daniel.ecommerce.auth.dto.response.UserAddressResponseDTO;
import com.daniel.ecommerce.auth.service.UserAddressService;
import com.daniel.ecommerce.shared.security.user.CurrentUser;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users/me/user-addresses")
public class UserAddressController {

    private final UserAddressService userAddressService;

    public UserAddressController(UserAddressService userAddressService) {
        this.userAddressService = userAddressService;
    }

    @GetMapping
    public ResponseEntity<List<UserAddressResponseDTO>> getUserAddressesByUserId(@CurrentUser CustomPrincipal customPrincipal) {
        UUID userId = UUID.fromString(customPrincipal.userId());
        List<UserAddressResponseDTO> userAddresses = userAddressService.getUserAddressesByUserId(userId);
        return ResponseEntity.ok(userAddresses);
    }

    @PostMapping
    public ResponseEntity<UserAddressResponseDTO> createUserAddress(@CurrentUser CustomPrincipal customPrincipal, @Valid @RequestBody UserAddressRequestDTO userAddressRequestDTO) {
        UUID userId = UUID.fromString(customPrincipal.userId());
        UserAddressResponseDTO userAddressResponseDTO = userAddressService.createUserAddress(userId, userAddressRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userAddressResponseDTO);
    }

    @PatchMapping("/{user_address_id}")
    public ResponseEntity<UserAddressResponseDTO> updateUserAddress(@CurrentUser CustomPrincipal customPrincipal, @PathVariable("user_address_id") UUID userAddressId, @Valid @RequestBody UserAddressRequestDTO userAddressRequestDTO) {
        UUID userId = UUID.fromString(customPrincipal.userId());
        UserAddressResponseDTO userAddressResponseDTO = userAddressService.updateUserAddress(userId, userAddressId, userAddressRequestDTO);
        return ResponseEntity.ok(userAddressResponseDTO);
    }

    @DeleteMapping("/{user_address_id}")
    public ResponseEntity<String> deleteUserAddress(@CurrentUser CustomPrincipal customPrincipal, @PathVariable("user_address_id") UUID userAddressId) {
        UUID userId = UUID.fromString(customPrincipal.userId());
        userAddressService.deleteUserAddress(userId, userAddressId);
        return ResponseEntity.ok("User address deleted successfully");
    }

}
