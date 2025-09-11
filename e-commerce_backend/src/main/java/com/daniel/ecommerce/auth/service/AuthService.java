package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.AuthCreateUserRequest;
import com.daniel.ecommerce.auth.dto.request.AuthLoginRequest;
import com.daniel.ecommerce.auth.dto.response.AuthResponse;
import org.springframework.security.core.Authentication;

public interface AuthService {

    AuthResponse createUser(AuthCreateUserRequest createRoleRequest);
    AuthResponse loginUser(AuthLoginRequest authLoginRequest);
}
