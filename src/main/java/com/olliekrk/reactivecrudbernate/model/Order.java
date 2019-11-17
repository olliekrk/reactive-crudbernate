package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;

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

    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    @JsonProperty(required = true)
    private Product product;

    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    @JsonProperty(required = true)
    private Customer customer;

    private Double unitPrice;

    private Double discount;

    private Long quantity;

    @Transient
    private String productName;

    @Transient
    private String customerEmail;

    @Transient
    private Double totalValue;

    public void calculateTotalValue() {
        totalValue = unitPrice * quantity * (1 - discount);
    }

    public void setTransientFields(){
        customerEmail = customer == null ? null : customer.getEmail();
        productName = product == null ? null : product.getProductName();
        calculateTotalValue();
    }
}
