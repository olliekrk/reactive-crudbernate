package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "category")
@ToString(exclude = "category")
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String productName;

    private String description;

    private Double unitPrice;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Category category;

    @Transient
    private String categoryName;
}
