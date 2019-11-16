package com.olliekrk.reactivecrudbernate.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String productName;
    private String categoryName;
    private String description;
    private Double unitPrice;

    public Product toProduct() {
        return Product.builder()
                .id(id)
                .description(description)
                .productName(productName)
                .unitPrice(unitPrice)
                .build();
    }

    public static ProductDto fromProduct(Product product) {
        return new ProductDto(
                product.getId(),
                product.getProductName(),
                product.getCategory() != null ? product.getCategory().getCategoryName() : null,
                product.getDescription(),
                product.getUnitPrice()
        );
    }
}
