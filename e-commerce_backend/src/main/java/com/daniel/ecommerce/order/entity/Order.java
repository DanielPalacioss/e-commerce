package com.daniel.ecommerce.order.entity;

import com.daniel.ecommerce.auth.entity.UserAddress;
import com.daniel.ecommerce.auth.entity.UserEntity;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "sales_orders")
public class Order {

    @GeneratedValue
    @Column(columnDefinition = "UUID", updatable = false)
    @Id
    private UUID id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private UserEntity user;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id", nullable = false)
    private UserAddress shippingAddress;

    @Setter
    @Column(name = "total", nullable = false, columnDefinition = "numeric(10,2)")
    private BigDecimal totalPrice;

    @Setter
    @Column(length = 15, nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatuses status;

    @Setter
    //orphanRemoval para remover los items que ya no existen en la lista y Merge para actualizar los items ya existentes
    @OneToMany(mappedBy = "order", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<OrderItem> items;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
