package com.daniel.ecommerce.product.service;

import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.entity.ProductStock;

import java.util.UUID;

public interface ProductStockService {

    ProductStock createProductStock(Product product);

    void increaseProductStock(Integer quantity, UUID productId);

    void decreaseProductStock(Integer quantity, UUID productId);
}
