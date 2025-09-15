package com.daniel.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "inventory_product_stocks")
public class ProductStock {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false, unique = true)
    private Product product;

    @Setter
    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    //Pre insert
    @PrePersist
    protected void onCreate() {
        updateAt = LocalDateTime.now();
    }

    //Pre update
    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
    }

}
