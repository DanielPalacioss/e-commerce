package com.daniel.ecommerce.shared.security.jwt;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import org.springframework.security.core.Authentication;

public interface JwtService {
    String createToken(Authentication authentication);

    DecodedJWT validateToken(String token);

    CustomPrincipal extractCustomPrincipal(DecodedJWT decodedJWT);
}
