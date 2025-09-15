package com.daniel.ecommerce.product.repository;

import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.enums.ProductCategories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    //EntityGraph para manejar N+1
    @EntityGraph(attributePaths = {"productStock"})
    Page<Product> findByCategoryAndActive(ProductCategories category, Boolean active, Pageable pageable);

    @EntityGraph(attributePaths = {"productStock"})
    Page<Product> findAllByActive(Boolean active, Pageable pageable);

    @EntityGraph(attributePaths = {"productStock"})
    List<Product> findAllById(Iterable<UUID> productIds);
}
