package com.daniel.ecommerce.shared.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JwtServiceImpl implements JwtService{

    private final long expirationMilliseconds;

    private final String secretKey;

    private final String issuer = "E-Commerce API";

    public JwtServiceImpl(@Value("${application.jwt.expiration}") long expirationMilliseconds, @Value("${application.jwt.secret}") String secretKey) {
        this.expirationMilliseconds = expirationMilliseconds;
        this.secretKey = secretKey;
    }

    public String createToken(Authentication authentication) {
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + expirationMilliseconds);
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        String username = authentication.getPrincipal().toString();
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String jwtToken = JWT.create()
                .withIssuer(issuer) // Who creates the token
                .withSubject(username)
                .withClaim("authorities", authorities)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiration)
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(issuedAt) //Desde cuando es valido el token
                .sign(algorithm);
        return jwtToken;
    }

    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);

            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build();

            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT;
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Token invalid, not Authorized");
        }
    }

    public String extractUsername(DecodedJWT decodedJWT){
        return decodedJWT.getSubject().toString();
    }

    public Claim getSpecificClaim(DecodedJWT decodedJWT, String claimName) {
        return decodedJWT.getClaim(claimName);
    }
}
