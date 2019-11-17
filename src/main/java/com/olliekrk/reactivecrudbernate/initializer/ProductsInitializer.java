package com.olliekrk.reactivecrudbernate.initializer;

import com.olliekrk.reactivecrudbernate.model.Category;
import com.olliekrk.reactivecrudbernate.model.Product;
import com.olliekrk.reactivecrudbernate.persistence.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ProductsInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    public ProductsInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Tea", "Coffee", "Alcohol", "Fish")
                .map(Category::new)
                .forEach(categoryRepository::save);

        Category fish = categoryRepository.findByCategoryName("Fish");
        Product tastyFish = Product.builder()
                .category(fish)
                .productName("Salmon")
                .description("Tasty salmon")
                .build();

        Product stinkyFish = Product.builder()
                .category(fish)
                .productName("Tuna")
                .description("Stinky tuna")
                .build();

        fish.setProducts(Stream.of(tastyFish, stinkyFish).collect(Collectors.toSet()));
        categoryRepository.save(fish);
        categoryRepository.findAll().forEach(System.out::println);
    }
}
