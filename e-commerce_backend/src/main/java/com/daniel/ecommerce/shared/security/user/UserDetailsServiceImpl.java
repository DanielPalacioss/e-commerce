package com.daniel.ecommerce.shared.security.user;

import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.auth.repository.UserRepository;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("Username '" + username + "' not found."));

        SimpleGrantedAuthority authorityList = new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().name()));
        //Se envia id donde va el username, debido a que necesitamos el id para crear el customerPrincipal
        return new User(userEntity.getId().toString(), userEntity.getPassword(), Collections.singleton(authorityList));
    }
}
