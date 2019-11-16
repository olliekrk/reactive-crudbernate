package com.olliekrk.reactivecrudbernate.persistence;

import com.olliekrk.reactivecrudbernate.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductName(String productName);
}
