package com.daniel.ecommerce.auth.controller;

import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/{username}")
    public ResponseEntity<String> getUserByUsername(@PathVariable String username) {

        return ResponseEntity.ok("a");
    }
}
