package com.daniel.ecommerce.product.controller;

import com.daniel.ecommerce.product.service.ProductStockService;
import jakarta.validation.constraints.Min;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Validated
@RestController
@RequestMapping("/products")
public class ProductStockController {

    private final ProductStockService productStockService;

    public ProductStockController(ProductStockService productStockService) {
        this.productStockService = productStockService;
    }

    @PostMapping("/{product_id}/increase_stock/{quantity}")
    public void increaseProductStock(@PathVariable("product_id")
                                     UUID productId,
                                     @PathVariable("quantity")
                                     @Min(value = 1, message = "The quantity must be greater than 0") Integer quantity) {
        productStockService.increaseProductStock(quantity, productId);
    }

    @PostMapping("/{product_id}/decrease_stock/{quantity}")
    public void decreaseProductStock(@PathVariable("product_id") UUID productId,
                                     @PathVariable("quantity")
                                     @Min(value = 1, message = "The quantity must be greater than 0") Integer quantity) {
        productStockService.decreaseProductStock(quantity, productId);
    }
}
