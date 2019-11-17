package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"product", "customer"})
@ToString(exclude = {"product", "customer"})
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "PRODUCT_FK")
    private Product product;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "CUSTOMER_FK")
    private Customer customer;

    @JsonProperty(required = true)
    private Double unitPrice;

    @JsonProperty(required = true)
    private Double discount;

    @JsonProperty(required = true)
    private Long quantity;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    @Transient
    private String productName;

    @Transient
    private String customerEmail;

    @Transient
    private Double totalValue;

    public void setTransientFields() {
        customerEmail = customer == null ? null : customer.getEmail();
        productName = product == null ? null : product.getProductName();
        totalValue = unitPrice * quantity * (1 - discount);
    }
}
