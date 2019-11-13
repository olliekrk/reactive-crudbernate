package com.olliekrk.reactivecrudbernate.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;


@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource getDataSource() {
        return DataSourceBuilder
                .create()
                .url("jdbc:derby://localhost:1527/DerbyDatabase;create=true")
                .driverClassName("org.apache.derby.jdbc.ClientDriver")
                .build();
    }
}
