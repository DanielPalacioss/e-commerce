package com.daniel.ecommerce.product.repository;

import com.daniel.ecommerce.product.entity.ProductStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStock, Integer> {
    Optional<ProductStock> findByProduct_Id(UUID productId);
}
