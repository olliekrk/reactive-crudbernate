package com.olliekrk.reactivecrudbernate.initializer;

import com.olliekrk.reactivecrudbernate.model.Company;
import com.olliekrk.reactivecrudbernate.model.Customer;
import com.olliekrk.reactivecrudbernate.model.embeddable.Address;
import com.olliekrk.reactivecrudbernate.persistence.CompanyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Stream;

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

        Company tradingCompany = new Company("Handlarze różności");
        Customer trader = Customer.builder()
                .company(tradingCompany)
                .email("wojownik123@metin.com")
                .firstName("Woj")
                .lastName("Mental")
                .company(tradingCompany)
                .address(new Address("M1", "Jinno", "CH1"))
                .build();

        tradingCompany.setEmployees(Collections.singleton(trader));

        companyRepository.save(tradingCompany);
        companyRepository.findAll().forEach(System.out::println);
    }
}
