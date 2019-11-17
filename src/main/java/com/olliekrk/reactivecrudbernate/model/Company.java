package com.olliekrk.reactivecrudbernate.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "employees")
@ToString(exclude = "employees")
public class Company {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String companyName;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Customer> employees;

    public Company(String companyName) {
        this.companyName = companyName;
    }
}
