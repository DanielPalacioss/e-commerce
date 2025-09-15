package com.daniel.ecommerce.product.entity;

import com.daniel.ecommerce.product.enums.ProductCategories;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "inventory_products")
public class Product {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID", updatable = false)
    private UUID id;

    @Setter
    @Column(length = 25, nullable = false)
    private String name;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String description;

    @Setter
    @Column(columnDefinition = "numeric(10,2)", nullable = false)
    private BigDecimal price;

    @Setter
    @Column(name = "image_public_id", columnDefinition = "TEXT")
    private String imagePublicId;

    @Setter
    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ProductCategories category;

    @Setter
    @OneToOne(mappedBy = "product")
    private ProductStock productStock;

    @Setter
    @Column
    private Boolean active;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
