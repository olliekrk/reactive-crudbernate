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

    @Transient
    private String productName;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Customer customer;

    @Transient
    private String customerEmail;

    private Double unitPrice;

    private Double discount;

    private Long quantity;

    @Transient
    private Double totalValue;

    public void calculateTotalValue() {
        totalValue = unitPrice * quantity * (1 - discount);
    }
}
