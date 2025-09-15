package com.daniel.ecommerce.auth.dto.request;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserAddressRequestDTO(

        @Size(min = 4, max = 80, message = "The full name must be between 4 and 80 characters")
        @NotBlank(message = "Full name cannot be blank or null")
        String fullName,

        @Size(max = 20, message = "The phone number must not exceed 20 characters")
        @Pattern(
                regexp = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$",
                message = "Invalid phone number format")
        @NotBlank(message = "Phone cannot be blank or null")
        String phone,

        @NotBlank(message = "Address cannot be blank or null")
        String addressLine,

        @Size(min = 2, max = 50, message = "The city must be between 2 and 50 characters")
        @NotBlank(message = "City cannot be blank or null")
        String city,

        @Size(min = 2, max = 50, message = "State must be between 2 and 50 characters")
        @NotBlank(message = "State cannot be blank or null")
        String state,

        @Size(min = 2, max = 50, message = "Postal code must be between 2 and 50 characters")
        @NotBlank(message = "Postal code cannot be blank or null")
        String postalCode,

        @Size(min = 2, max = 50, message = "Country must be between 2 and 50 characters")
        @NotBlank(message = "Country cannot be blank or null")
        String country

) {
}
