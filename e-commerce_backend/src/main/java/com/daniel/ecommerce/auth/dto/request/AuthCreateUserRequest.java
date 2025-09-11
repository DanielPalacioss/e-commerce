package com.daniel.ecommerce.auth.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AuthCreateUserRequest(
        @NotBlank(message = "name cannot be blank or null")
        @Size(min = 2, max = 50, message = "'name' must be between 2 and 20 characters")
        String name,

        @NotBlank(message = "username cannot be blank or null")
        @Size(min = 3, max = 20, message = "username must be between 3 and 20 characters")
        String username,

        @NotBlank(message = "password cannot be blank or null")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_-])[a-zA-Z0-9!@#$%^&*()_-]{12,}$",
                message = "The password must have at least 12 characters, one lowercase letter, one uppercase letter, one number, and a special symbol.")
        String password,

        @NotBlank(message = "email cannot be blank or null")
        @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
        String email
) {}
