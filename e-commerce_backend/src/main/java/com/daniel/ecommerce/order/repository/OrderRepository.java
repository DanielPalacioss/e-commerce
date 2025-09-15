package com.daniel.ecommerce.order.repository;

import com.daniel.ecommerce.order.entity.Order;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    @EntityGraph(attributePaths = {"items", "items.product", "user", "shippingAddress"})
        //Para manejar N+1
        //Only user and admin
    Page<Order> findAllByStatusAndUser_Id(OrderStatuses status, UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = {"items", "items.product", "user", "shippingAddress"})
        //Para manejar N+1
    Page<Order> findAllByUser_Id(UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = {"items", "items.product", "user", "shippingAddress"})
        //Para manejar N+1
        //Only admin
    Page<Order> findAllByStatus(OrderStatuses status, Pageable pageable);

    @EntityGraph(attributePaths = {"items", "items.product", "user", "shippingAddress"})
        //Para manejar N+1
    Page<Order> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"items", "items.product", "user", "shippingAddress"})
        //Para manejar N+1
    Optional<Order> findById(UUID orderId);
}
