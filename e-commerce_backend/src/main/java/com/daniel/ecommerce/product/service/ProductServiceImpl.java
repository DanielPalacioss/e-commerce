package com.daniel.ecommerce.product.service;

import com.daniel.ecommerce.product.dto.request.ProductRequestDTO;
import com.daniel.ecommerce.product.dto.response.ProductPageResponseDTO;
import com.daniel.ecommerce.product.dto.response.ProductResponseDTO;
import com.daniel.ecommerce.product.entity.Product;
import com.daniel.ecommerce.product.entity.ProductStock;
import com.daniel.ecommerce.product.enums.ProductCategories;
import com.daniel.ecommerce.product.repository.ProductRepository;
import com.daniel.ecommerce.shared.cloudinary.service.CloudinaryService;
import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;
    private final ProductStockService productStockService;

    public ProductServiceImpl(ProductRepository productRepository, CloudinaryService cloudinaryService, ProductStockService productStockService) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
        this.productStockService = productStockService;
    }

    @Override
    public ProductPageResponseDTO getPageProductWithFilters(Pageable pageable, Boolean active, ProductCategories category) {
        Page<Product> productPage;
        if (category == null) {
            productPage = productRepository.findAllByActive(active, pageable);
        } else {
            productPage = productRepository.findByCategoryAndActive(category, active, pageable);
        }

        List<ProductResponseDTO> productsDTO = productPage.map(product -> new ProductResponseDTO(product)).toList();
        return ProductPageResponseDTO.builder()
                .products(productsDTO)
                .page(productPage.getNumber())
                .totalPages(productPage.getTotalPages())
                .totalElements(productPage.getTotalElements())
                .size(productPage.getSize())
                .build();
    }

    @Override
    public ProductResponseDTO getProductById(UUID productId) {
        Product product = getProductEntityById(productId);
        return new ProductResponseDTO(product);
    }

    @Override
    public ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO productRequestDTO) {
        Product product = getProductEntityById(productId);
        product.setName(productRequestDTO.name());
        product.setDescription(productRequestDTO.description());
        product.setPrice(productRequestDTO.price());
        product.setCategory(productRequestDTO.category());
        productRepository.save(product);
        return new ProductResponseDTO(product);
    }

    @Transactional
    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Product product = Product.builder()
                .id(null)
                .name(productRequestDTO.name())
                .description(productRequestDTO.description())
                .price(productRequestDTO.price())
                .category(productRequestDTO.category())
                .active(true)
                .build();
        product = productRepository.save(product);

        ProductStock productStock = productStockService.createProductStock(product);
        product.setProductStock(productStock);
        return new ProductResponseDTO(product);
    }

    @Override
    public void deactivateProduct(UUID productId) {
        Product product = getProductEntityById(productId);
        if (Boolean.TRUE.equals(product.getActive())) {
            product.setActive(false);
            productRepository.save(product);
        } else {
            throw new ConflictException("The product is already inactive");
        }
    }

    @Override
    public void activateProduct(UUID productId) {
        Product product = getProductEntityById(productId);
        if (Boolean.FALSE.equals(product.getActive())) {
            product.setActive(true);
            productRepository.save(product);
        } else {
            throw new ConflictException("The product is already activated");
        }
    }

    @Override
    public String uploadImageProduct(UUID productId, MultipartFile file) {
        Product product = getProductEntityById(productId);
        Map<String, String> result = cloudinaryService.uploadOrReplaceFile(product.getImagePublicId(),
                file, "products");

        product.setImagePublicId(result.get("publicId"));
        product.setImageUrl(result.get("url"));

        productRepository.save(product);
        return product.getImageUrl();
    }

    @Override
    public List<Product> findAllByIdIn(List<UUID> productIds) {
        return productRepository.findAllById(productIds);
    }

    private Product getProductEntityById(UUID productId) {
        return productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product with id " + productId + " not found"));
    }
}
