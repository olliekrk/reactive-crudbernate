package com.olliekrk.reactivecrudbernate.persistence;

import com.olliekrk.reactivecrudbernate.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryName(String categoryName);

    List<Category> findByCategoryNameContainingIgnoreCase(String categoryName);

    @Query("SELECT c FROM Category AS c WHERE c.categoryName LIKE CONCAT(?1, '%')")
    List<Category> findByPrefixIgnoreCase(String categoryName);
}
