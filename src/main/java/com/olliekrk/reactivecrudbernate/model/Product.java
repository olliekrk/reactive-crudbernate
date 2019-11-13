package com.olliekrk.reactivecrudbernate.model;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "category")
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    private String productName;

    private String description;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Category category;
}
