package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "products")
@Entity
@Table(name = "Categories")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String categoryName;

    private String description;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "category", orphanRemoval = true)
    private Set<Product> products;

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
