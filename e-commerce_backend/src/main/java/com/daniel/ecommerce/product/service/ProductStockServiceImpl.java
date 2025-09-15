package com.daniel.ecommerce.product.service;

import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.entity.ProductStock;
import com.daniel.ecommerce.product.repository.ProductStockRepository;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductStockServiceImpl implements ProductStockService {

    private final ProductStockRepository productStockRepository;

    public ProductStockServiceImpl(ProductStockRepository productStockRepository) {
        this.productStockRepository = productStockRepository;
    }

    @Override
    public ProductStock createProductStock(Product product) {
        return productStockRepository.save(ProductStock.builder().quantity(0).product(product).build());
    }

    @Override
    public void increaseProductStock(Integer quantity, UUID productId) {
        ProductStock productStock = productStockRepository.findByProduct_Id(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product stock with product id " + productId + " not found"));
        productStock.setQuantity(productStock.getQuantity() + quantity);
        productStockRepository.save(productStock);
    }

    @Override
    public void decreaseProductStock(Integer quantity, UUID productId) {
        ProductStock productStock = productStockRepository.findByProduct_Id(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product stock with product id " + productId + " not found"));
        if (productStock.getQuantity() < quantity) {
            throw new ConflictException("Insufficient stock for product id " + productId);
        }
        productStock.setQuantity(productStock.getQuantity() - quantity);
        productStockRepository.save(productStock);
    }
}
