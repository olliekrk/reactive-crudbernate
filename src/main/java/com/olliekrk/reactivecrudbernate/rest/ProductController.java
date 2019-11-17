package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Category;
import com.olliekrk.reactivecrudbernate.model.Product;
import com.olliekrk.reactivecrudbernate.persistence.CategoryRepository;
import com.olliekrk.reactivecrudbernate.persistence.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/API/products")
public class ProductController {
    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    private ProductRepository productRepository;

    private CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/all")
    Collection<Product> getAll() {
        List<Product> allProducts = productRepository.findAll();
        allProducts.forEach(Product::setTransientFields);
        return allProducts;
    }

    @GetMapping("/{productId}")
    ResponseEntity<?> getById(@PathVariable Long productId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        productOpt.ifPresent(Product::setTransientFields);
        return productOpt
                .map(product -> ResponseEntity.ok().body(product))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Product> create(@Valid @RequestBody Product product) throws URISyntaxException {
        log.info("Request to create new product: {}", product);
        Category category = categoryRepository.findByCategoryName(product.getCategoryName());
        product.setCategory(category);

        productRepository.save(product);
        return ResponseEntity.ok().body(product);
    }

    @PutMapping
    ResponseEntity<Product> update(@Valid @RequestBody Product product) throws URISyntaxException {
        log.info("Request to update product: {}", product);
        Category category = categoryRepository.findByCategoryName(product.getCategoryName());
        product.setCategory(category);

        productRepository.save(product);
        return ResponseEntity.ok().body(product);
    }

    @DeleteMapping("/{productId}")
    ResponseEntity<?> delete(@PathVariable Long productId) {
        log.info("Request to delete product with ID: {}", productId);
        productRepository.deleteById(productId);

        productRepository
                .findById(productId)
                .flatMap(product -> categoryRepository.findById(product.getCategory().getId()))
                .ifPresent(category -> {
                    category.getProducts().removeIf(product -> product.getId().equals(productId));
                    categoryRepository.save(category);
                });
        
        return ResponseEntity.ok().build();
    }
}
