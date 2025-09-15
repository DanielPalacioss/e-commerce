package com.daniel.ecommerce.order.entity;

import com.daniel.ecommerce.order.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "sales_invoices")
public class Invoice {

    @GeneratedValue
    @Column(columnDefinition = "UUID", updatable = false)
    @Id
    private UUID id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    private Order order;

    @Column(name = "total", nullable = false, columnDefinition = "numeric(10,2)")
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(length = 25, nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "issued_at", columnDefinition = "TIMESTAMP", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
