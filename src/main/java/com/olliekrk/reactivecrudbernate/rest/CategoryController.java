package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Category;
import com.olliekrk.reactivecrudbernate.persistence.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/API/categories")
public class CategoryController {
    private final Logger log = LoggerFactory.getLogger(CategoryController.class);
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/all")
    Collection<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{categoryId}")
    ResponseEntity<?> getCategoryById(@PathVariable Long categoryId) {
        Optional<Category> categoryOpt = categoryRepository.findById(categoryId);
        return categoryOpt
                .map(category -> ResponseEntity.ok().body(category))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        log.info("Request to create new category: {}", category);
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        log.info("Request to update category: {}", category);
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{categoryId}")
    ResponseEntity<?> deleteCategory(@Valid @RequestBody Long categoryId) {
        log.info("Request to delete category with ID: {}", categoryId);
        categoryRepository.deleteById(categoryId);
        return ResponseEntity.ok().build();
    }
}
