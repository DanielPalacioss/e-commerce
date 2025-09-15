package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.auth.dto.request.AuthCreateUserRequest;
import com.daniel.ecommerce.auth.dto.request.AuthLoginRequest;
import com.daniel.ecommerce.auth.dto.response.AuthResponse;
import com.daniel.ecommerce.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController()
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthCreateUserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.createUser(userRequest));
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest userRequest) {
        return ResponseEntity.ok(authService.loginUser(userRequest));
    }
}
