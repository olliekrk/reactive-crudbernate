package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Category;
import com.olliekrk.reactivecrudbernate.model.Product;
import com.olliekrk.reactivecrudbernate.model.ProductDto;
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
import java.util.Optional;
import java.util.stream.Collectors;

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
    Collection<ProductDto> getAll() {
        return productRepository
                .findAll()
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }

    @GetMapping("/{productId}")
    ResponseEntity<?> getById(@PathVariable Long productId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        return productOpt
                .map(ProductDto::fromProduct)
                .map(product -> ResponseEntity.ok().body(product))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<ProductDto> create(@Valid @RequestBody ProductDto productDto) throws URISyntaxException {
        log.info("Request to create new product: {}", productDto);
        Product productToSave = productDto.toProduct();

        Category category = categoryRepository.findByCategoryName(productDto.getCategoryName());
        productToSave.setCategory(category);

        productRepository.save(productToSave);
        return ResponseEntity.ok().body(productDto);
    }

    @PutMapping
    ResponseEntity<ProductDto> update(@Valid @RequestBody ProductDto productDto) throws URISyntaxException {
        log.info("Request to update product: {}", productDto);
        Product productToSave = productDto.toProduct();

        Category category = categoryRepository.findByCategoryName(productDto.getCategoryName());
        productToSave.setCategory(category);

        productRepository.save(productToSave);
        return ResponseEntity.ok().body(productDto);
    }

    @DeleteMapping("/{productId}")
    ResponseEntity<?> delete(@PathVariable Long productId) {
        log.info("Request to delete product with ID: {}", productId);
        productRepository.deleteById(productId);
        return ResponseEntity.ok().build();
    }
}
