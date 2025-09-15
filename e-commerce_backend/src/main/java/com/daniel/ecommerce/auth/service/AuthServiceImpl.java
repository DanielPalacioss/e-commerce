package com.daniel.ecommerce.auth.service;

import com.daniel.ecommerce.auth.dto.request.AuthCreateUserRequest;
import com.daniel.ecommerce.auth.dto.request.AuthLoginRequest;
import com.daniel.ecommerce.auth.dto.response.AuthResponse;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.enums.Role;
import com.daniel.ecommerce.auth.repository.UserRepository;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.security.jwt.JwtService;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    public AuthServiceImpl(JwtService jwtService, PasswordEncoder passwordEncoder, UserRepository userRepository, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public AuthResponse createUser(AuthCreateUserRequest createUserRequest) {

        String username = createUserRequest.username();
        String password = createUserRequest.password();
        userRepository.findByUsername(username).ifPresent(user -> {
            throw new ConflictException("Username already exists");
        });

        UserEntity userEntity = UserEntity.builder()
                .name(createUserRequest.name())
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(createUserRequest.email())
                .role(Role.CLIENT).build();

        userRepository.save(userEntity);

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_".concat(Role.CLIENT.name()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(new CustomPrincipal(userEntity.getId().toString(), username), null, Collections.singleton(authority));

        String accessToken = jwtService.createToken(authentication);

        AuthResponse authResponse = new AuthResponse(accessToken);
        return authResponse;
    }

    @Override
    public AuthResponse loginUser(AuthLoginRequest authLoginRequest) {

        String username = authLoginRequest.username();
        String password = authLoginRequest.password();

        Authentication authentication = this.authenticate(username, password);

        String accessToken = jwtService.createToken(authentication);
        AuthResponse authResponse = new AuthResponse(accessToken);
        return authResponse;
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new ConflictException("Incorrect Password");
        }
        //El username que viene del userDetails es el Id del usuario
        return new UsernamePasswordAuthenticationToken(new CustomPrincipal(userDetails.getUsername(), username), password, userDetails.getAuthorities());
    }
}
