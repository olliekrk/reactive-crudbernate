package com.olliekrk.reactivecrudbernate.rest;

import com.olliekrk.reactivecrudbernate.model.Customer;
import com.olliekrk.reactivecrudbernate.model.Order;
import com.olliekrk.reactivecrudbernate.model.Product;
import com.olliekrk.reactivecrudbernate.persistence.CustomerRepository;
import com.olliekrk.reactivecrudbernate.persistence.OrderRepository;
import com.olliekrk.reactivecrudbernate.persistence.ProductRepository;
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
@RequestMapping("/API/orders")
public class OrderController {
    private final Logger log = LoggerFactory.getLogger(OrderController.class);
    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    private CustomerRepository customerRepository;

    public OrderController(OrderRepository orderRepository, ProductRepository productRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/all")
    Collection<Order> getAll() {
        List<Order> allOrders = orderRepository.findAll();
        allOrders.forEach(Order::setTransientFields);
        return allOrders;
    }

    @GetMapping("/{orderId}")
    ResponseEntity<?> getById(@PathVariable Long orderId) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        orderOpt.ifPresent(Order::setTransientFields);
        return orderOpt
                .map(order -> ResponseEntity.ok().body(order))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Order> create(@Valid @RequestBody Order order) throws URISyntaxException {
        log.info("Request to create new order: {}", order);
        Customer customer = customerRepository.findByEmail(order.getCustomerEmail());
        order.setCustomer(customer);
        Product product = productRepository.findByProductName(order.getProductName());
        order.setProduct(product);

        orderRepository.save(order);
        return ResponseEntity.ok().body(order);
    }

    @PutMapping
    ResponseEntity<Order> update(@Valid @RequestBody Order order) throws URISyntaxException {
        log.info("Request to update order: {}", order);
        Customer customer = customerRepository.findByEmail(order.getCustomerEmail());
        order.setCustomer(customer);
        Product product = productRepository.findByProductName(order.getProductName());
        order.setProduct(product);

        orderRepository.save(order);
        return ResponseEntity.ok().body(order);
    }

    @DeleteMapping("/{orderId}")
    ResponseEntity<?> delete(@PathVariable Long orderId) {
        log.info("Request to delete order with ID: {}", orderId);
        orderRepository.deleteById(orderId);
        return ResponseEntity.ok().build();
    }
}
