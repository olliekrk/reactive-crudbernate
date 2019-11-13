package com.olliekrk.reactivecrudbernate.persistence;

import com.olliekrk.reactivecrudbernate.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryName(String categoryName);
}
