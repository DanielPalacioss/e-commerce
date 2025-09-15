package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.AuthCreateUserRequest;
import com.daniel.ecommerce.auth.dto.request.AuthLoginRequest;
import com.daniel.ecommerce.auth.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse createUser(AuthCreateUserRequest createRoleRequest);

    AuthResponse loginUser(AuthLoginRequest authLoginRequest);
}
