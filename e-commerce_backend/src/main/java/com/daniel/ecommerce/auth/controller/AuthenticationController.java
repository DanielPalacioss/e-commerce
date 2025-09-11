package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.auth.dto.request.AuthCreateUserRequest;
import com.daniel.ecommerce.auth.dto.request.AuthLoginRequest;
import com.daniel.ecommerce.auth.dto.response.AuthResponse;
import com.daniel.ecommerce.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController()
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthCreateUserRequest userRequest){
        return new ResponseEntity<>(authService.createUser(userRequest), HttpStatus.CREATED);
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest userRequest){
        return new ResponseEntity<>(authService.loginUser(userRequest), HttpStatus.OK);
    }
}
