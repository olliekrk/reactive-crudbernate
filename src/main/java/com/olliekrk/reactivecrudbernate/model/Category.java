package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(exclude = "products")
@ToString(exclude = "products")
@Table(name = "Categories")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String categoryName;

    private String description;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Product> products;

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
