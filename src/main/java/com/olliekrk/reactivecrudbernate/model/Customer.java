package com.olliekrk.reactivecrudbernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.olliekrk.reactivecrudbernate.model.embeddable.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;
import java.util.Set;


@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Customers")
public class Customer {
    @Id
    @GeneratedValue
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    @JsonUnwrapped
    @Embedded
    private Address address;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    private Company company;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Order> orders;

    @Transient
    private String companyName;

    @Transient
    private Integer ordersCount;

    public void setTransientFields() {
        companyName = company == null ? null : company.getCompanyName();
        ordersCount = Optional.ofNullable(orders).map(Set::size).orElse(0);
    }
}
