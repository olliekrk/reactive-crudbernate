package com.olliekrk.reactivecrudbernate.initializer;

import com.olliekrk.reactivecrudbernate.persistence.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Order(3)
@Component
public class ScanInitializer implements CommandLineRunner {
    private CompanyRepository companyRepository;
    private CustomerRepository customerRepository;
    private CategoryRepository categoryRepository;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;

    public ScanInitializer(CompanyRepository companyRepository, CustomerRepository customerRepository, CategoryRepository categoryRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("\n\n= Companies found with findAll() =");
        companyRepository.findAll().forEach(System.out::println);

        System.out.println("\n\n= Customers found with findAll() =");
        customerRepository.findAll().forEach(System.out::println);

        System.out.println("\n\n= Categories found with findAll() =");
        categoryRepository.findAll().forEach(System.out::println);

        System.out.println("\n\n= Orders found with findAll() =");
        orderRepository.findAll().forEach(System.out::println);

        System.out.println("\n\n= Products found with findAll() =");
        productRepository.findAll().forEach(System.out::println);
    }
}
