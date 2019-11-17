package com.olliekrk.reactivecrudbernate.persistence;

import com.olliekrk.reactivecrudbernate.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // JPQL query example
    @Query("SELECT o FROM Order AS o WHERE o.createdAt < ?1")
    List<Order> findOlderThan(Date date);
}
