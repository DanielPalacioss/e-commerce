package com.daniel.ecommerce.product.service;

import com.daniel.ecommerce.product.dto.request.ProductRequestDTO;
import com.daniel.ecommerce.product.dto.response.ProductPageResponseDTO;
import com.daniel.ecommerce.product.dto.response.ProductResponseDTO;
import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.enums.ProductCategories;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductPageResponseDTO getPageProductWithFilters(Pageable pageable, Boolean active, ProductCategories category);

    ProductResponseDTO getProductById(UUID productId);

    ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO productRequestDTO);

    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO);

    void deactivateProduct(UUID productId);

    void activateProduct(UUID productId);

    String uploadImageProduct(UUID productId, MultipartFile file);

    List<Product> findAllByIdIn(List<UUID> productIds);

}
