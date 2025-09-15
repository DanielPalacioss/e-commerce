package com.daniel.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "auth_user_addresses")
public class UserAddress {

    @GeneratedValue
    @Column(columnDefinition = "UUID", updatable = false)
    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private UserEntity user;

    @Setter
    @Column(name = "full_name", nullable = false, length = 80)
    private String fullName;

    @Setter
    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Setter
    @Column(name = "address_line", nullable = false, columnDefinition = "TEXT")
    private String addressLine;

    @Setter
    @Column(name = "city", length = 50)
    private String city;

    @Setter
    @Column(name = "state", length = 50)
    private String state;

    @Setter
    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Setter
    @Column(name = "country", length = 50)
    private String country;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
