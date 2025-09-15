package com.daniel.ecommerce.auth.entity;

import com.daniel.ecommerce.auth.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auth_users")
public class UserEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID", updatable = false)
    private UUID id;

    @Setter
    @Column(length = 50, nullable = false)
    private String name;

    @Setter
    @Column(length = 80, nullable = false, unique = true)
    private String email;

    @Column(length = 20, updatable = false, nullable = false, unique = true)
    private String username;

    @Setter
    @Column(columnDefinition = "TEXT", nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Setter
    @Column(name = "profile_picture_url", columnDefinition = "TEXT")
    private String profilePictureUrl;

    @Setter
    @Column(name = "profile_picture_public_id", columnDefinition = "TEXT")
    private String profilePicturePublicId;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
