package com.daniel.ecommerce.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserRequestDTO(
        @NotBlank(message = "name cannot be blank or null")
        @Size(min = 2, max = 50, message = "'name' must be between 2 and 50 characters")
        String name,


        @NotBlank(message = "email cannot be blank or null")
        @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
        String email
) {
}
