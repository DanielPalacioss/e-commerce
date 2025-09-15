package com.daniel.ecommerce.product.controller;

import com.daniel.ecommerce.product.dto.request.ProductRequestDTO;
import com.daniel.ecommerce.product.dto.response.ProductPageResponseDTO;
import com.daniel.ecommerce.product.dto.response.ProductResponseDTO;
import com.daniel.ecommerce.product.enums.ProductCategories;
import com.daniel.ecommerce.product.enums.ProductSortForField;
import com.daniel.ecommerce.product.enums.SortDirection;
import com.daniel.ecommerce.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ProductPageResponseDTO> getPageProductByCategory(@RequestParam(defaultValue = "0") int page,
                                                                           @RequestParam(defaultValue = "10") int size,
                                                                           @RequestParam(required = false) ProductCategories category,
                                                                           @RequestParam(defaultValue = "true") Boolean active,
                                                                           @RequestParam(defaultValue = "name") ProductSortForField field,
                                                                           @RequestParam(defaultValue = "asc") SortDirection direction
    ) {
        Pageable pageable;
        if (SortDirection.asc.equals(direction)) {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).descending());
        }
        ProductPageResponseDTO productPage = productService.getPageProductWithFilters(pageable, active, category);
        return ResponseEntity.ok(productPage);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable(name = "product_id") UUID productId) {
        ProductResponseDTO productResponseDTO = productService.getProductById(productId);
        return ResponseEntity.ok(productResponseDTO);
    }

    @PatchMapping("/{product_id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable("product_id") UUID productId, @Valid @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.updateProduct(productId, productRequestDTO);
        return ResponseEntity.ok(productResponseDTO);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO productResponseDTO = productService.createProduct(productRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponseDTO);
    }

    @PostMapping("/{product_id}/deactivate")
    public ResponseEntity<String> deactivateProduct(@PathVariable("product_id") UUID productId) {
        productService.deactivateProduct(productId);
        return ResponseEntity.ok("Product deactivated successfully");
    }

    @PostMapping("/{product_id}/activate")
    public ResponseEntity<String> activateProduct(@PathVariable("product_id") UUID productId) {
        productService.activateProduct(productId);
        return ResponseEntity.ok("Product activate successfully");
    }

    @PatchMapping("/{product_id}/upload-image")
    public ResponseEntity<String> uploadImageProduct(@PathVariable("product_id") UUID productId, @RequestParam("file") MultipartFile file) {
        String url = productService.uploadImageProduct(productId, file);
        return ResponseEntity.ok(url);
    }
}
