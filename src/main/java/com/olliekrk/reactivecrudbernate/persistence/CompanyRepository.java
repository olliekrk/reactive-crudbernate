package com.olliekrk.reactivecrudbernate.persistence;

import com.olliekrk.reactivecrudbernate.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByCompanyName(String companyName);
}
