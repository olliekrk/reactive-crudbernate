package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Company;
import com.olliekrk.reactivecrudbernate.model.Customer;
import com.olliekrk.reactivecrudbernate.persistence.CompanyRepository;
import com.olliekrk.reactivecrudbernate.persistence.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/API/customers")
public class CustomerController {
    private final Logger log = LoggerFactory.getLogger(CustomerController.class);
    private CustomerRepository customerRepository;
    private CompanyRepository companyRepository;

    public CustomerController(CustomerRepository customerRepository, CompanyRepository companyRepository) {
        this.customerRepository = customerRepository;
        this.companyRepository = companyRepository;
    }

    @GetMapping("/all")
    Collection<Customer> getAll() {
        List<Customer> allCustomers = customerRepository.findAll();
        allCustomers.forEach(p -> p.setCompanyName(p.getCompany().getCompanyName()));
        return allCustomers;
    }

    @GetMapping("/{customerId}")
    ResponseEntity<?> getById(@PathVariable Long customerId) {
        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        customerOpt.ifPresent(p -> p.setCompanyName(p.getCompany().getCompanyName()));
        return customerOpt
                .map(customer -> ResponseEntity.ok().body(customer))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Customer> create(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.info("Request to create new customer: {}", customer);
        Company company = companyRepository.findByCompanyName(customer.getCompanyName());
        customer.setCompany(company);

        customerRepository.save(customer);
        return ResponseEntity.ok().body(customer);
    }

    @PutMapping
    ResponseEntity<Customer> update(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.info("Request to update customer: {}", customer);
        Company company = companyRepository.findByCompanyName(customer.getCompanyName());
        customer.setCompany(company);

        customerRepository.save(customer);
        return ResponseEntity.ok().body(customer);
    }

    @DeleteMapping("/{customerId}")
    ResponseEntity<?> delete(@PathVariable Long customerId) {
        log.info("Request to delete customer with ID: {}", customerId);
        customerRepository.deleteById(customerId);
        return ResponseEntity.ok().build();
    }
}
