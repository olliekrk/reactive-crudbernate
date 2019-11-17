package com.olliekrk.reactivecrudbernate.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "employees")
@Entity
public class Company {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String companyName;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "company", orphanRemoval = true)
    private Set<Customer> employees;

    public Company(String companyName) {
        this.companyName = companyName;
    }
}
