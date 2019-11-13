package com.olliekrk.reactivecrudbernate.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Product product;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Customer customer;

    private Double unitPrice;

    private Long quantity;
}
