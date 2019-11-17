package com.olliekrk.reactivecrudbernate.initializer;

import com.olliekrk.reactivecrudbernate.model.Company;
import com.olliekrk.reactivecrudbernate.model.Customer;
import com.olliekrk.reactivecrudbernate.model.embeddable.Address;
import com.olliekrk.reactivecrudbernate.persistence.CompanyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Order(2)
@Component
public class CustomersInitializer implements CommandLineRunner {
    private final CompanyRepository companyRepository;

    public CustomersInitializer(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Amazon", "EBAY", "Allegro", "OLX")
                .map(Company::new)
                .forEach(companyRepository::save);

        Address tradingAddress = new Address("M1", "Jinno", "CH1");
        Company tradingCompany = new Company("Handlarze różności");
        Customer trader1 = Customer.builder()
                .address(tradingAddress)
                .company(tradingCompany)
                .email("seller@trader.com")
                .firstName("John")
                .lastName("Doe")
                .build();

        Customer trader2 = Customer.builder()
                .address(tradingAddress)
                .company(tradingCompany)
                .email("buyer@trader.com")
                .firstName("Joe")
                .lastName("Dohn")
                .build();

        tradingCompany.setEmployees(Stream.of(trader1, trader2).collect(Collectors.toSet()));

        companyRepository.save(tradingCompany);
    }
}
