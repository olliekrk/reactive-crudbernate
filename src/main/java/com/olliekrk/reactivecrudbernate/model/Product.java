package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "category")
@ToString(exclude = "category")
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String productName;

    private String description;

    private Double unitPrice;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "CATEGORY_FK")
    private Category category;

    @Transient
    private String categoryName;

    public void setTransientFields() {
        categoryName = category == null ? null : category.getCategoryName();
    }
}
