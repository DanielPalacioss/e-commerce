package com.daniel.ecommerce.order.entity;

import com.daniel.ecommerce.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "sales_order_items")
public class OrderItem {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    @Id
    private Integer id;

    @Setter
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", nullable = false)
    private BigDecimal price;
}
