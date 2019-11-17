import {SelectableOption} from "../model/FormField";
import {categoriesConfig, companiesConfig, customersConfig, productsConfig} from "./ListConfigs";
import {CategoryInfo} from "../data/CategoryInfo";
import {CompanyInfo} from "../data/CompanyInfo";
import {CustomerInfo} from "../data/CustomerInfo";
import {ProductInfo} from "../data/ProductInfo";

export function fetchCategories(): Promise<SelectableOption[]> {
    return fetch(`/API${categoriesConfig.componentEndpoint}/all`)
        .then(response => response.json())
        .then((categories: CategoryInfo[]) =>
            categories.map(c => (
                {
                    optionValue: c.categoryName,
                    optionLabel: c.categoryName,
                } as SelectableOption)
            )
        );
}


export function fetchCompanies(): Promise<SelectableOption[]> {
    return fetch(`/API${companiesConfig.componentEndpoint}/all`)
        .then(response => response.json())
        .then((companies: CompanyInfo[]) =>
            companies.map(c => (
                {
                    optionValue: c.companyName,
                    optionLabel: c.companyName,
                } as SelectableOption)
            )
        );
}

export function fetchCustomers(): Promise<SelectableOption[]> {
    return fetch(`/API${customersConfig.componentEndpoint}/all`)
        .then(response => response.json())
        .then((customers: CustomerInfo[]) =>
            customers.map(c => (
                {
                    optionValue: c.email,
                    optionLabel: `(${c.email}) ${c.firstName || ""} ${c.lastName || ""}`,
                } as SelectableOption)
            )
        );
}

export function fetchProducts(): Promise<SelectableOption[]> {
    return fetch(`/API${productsConfig.componentEndpoint}/all`)
        .then(response => response.json())
        .then((products: ProductInfo[]) =>
            products.map(p => (
                {
                    optionValue: p.productName,
                    optionLabel: p.productName,
                } as SelectableOption)
            )
        );
}