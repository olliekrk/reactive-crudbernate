package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Company;
import com.olliekrk.reactivecrudbernate.persistence.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/API/companies")
public class CompanyController {
    private final Logger log = LoggerFactory.getLogger(CompanyController.class);
    private CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping("/all")
    Collection<Company> getAll() {
        return companyRepository.findAll();
    }

    @GetMapping("/{companyId}")
    ResponseEntity<?> getById(@PathVariable Long companyId) {
        Optional<Company> companyOpt = companyRepository.findById(companyId);
        return companyOpt
                .map(company -> ResponseEntity.ok().body(company))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Company> create(@Valid @RequestBody Company company) throws URISyntaxException {
        log.info("Request to create new company: {}", company);
        Company result = companyRepository.save(company);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    ResponseEntity<Company> update(@Valid @RequestBody Company company) throws URISyntaxException {
        log.info("Request to update company: {}", company);
        Company result = companyRepository.save(company);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{companyId}")
    ResponseEntity<?> delete(@PathVariable Long companyId) {
        log.info("Request to delete company with ID: {}", companyId);
        companyRepository.deleteById(companyId);
        return ResponseEntity.ok().build();
    }
}
