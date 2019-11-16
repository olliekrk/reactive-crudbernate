import {ComponentConfig} from "../model/ComponentConfig";
import {CategoryInfo} from "../data/CategoryInfo";
import {CompanyInfo} from "../data/CompanyInfo";
import {ProductInfo} from "../data/ProductInfo";
import {fetchCategories} from "./ConfigUtils";

export const categoriesConfig: ComponentConfig = {
    componentEndpoint: "/categories",
    componentTitle: "Categories",
    headerValues: [
        "Id",
        "Name",
        "Description",
        "Actions",
    ],
    itemToValues: (item) => {
        const category = item as CategoryInfo;
        return [
            category.id,
            category.categoryName,
            category.description || "No description provided",
        ];
    },
    fields: [
        {
            fieldName: "categoryName",
            fieldLabel: "Name of the category",
        },
        {
            fieldName: "description",
            fieldLabel: "Description",
        },
    ],
    selectableFields: [],
};

export const companiesConfig: ComponentConfig = {
    componentEndpoint: "/companies",
    componentTitle: "Companies",
    headerValues: [
        "Id",
        "Name",
        "Actions",
    ],
    itemToValues: (item) => {
        const company = item as CompanyInfo;
        return [
            company.id,
            company.companyName,
        ];
    },
    fields: [
        {
            fieldName: "companyName",
            fieldLabel: "Name of the company",
        },
    ],
    selectableFields: [],
};

export const productsConfig: ComponentConfig = {
    componentEndpoint: "/products",
    componentTitle: "Products",
    headerValues: [
        "Id",
        "Product name",
        "Description",
        "Current price per unit",
        "Category name",
        "Actions",
    ],
    itemToValues: (item) => {
        const product = item as ProductInfo;
        return [
            product.id,
            product.productName,
            product.description || "No description provided.",
            product.unitPrice,
            product.categoryName || "No category defined",
        ];
    },
    fields: [
        {
            fieldName: "productName",
            fieldLabel: "Name of the product",
        },
        {
            fieldName: "description",
            fieldLabel: "Description",
        },
        {
            fieldName: "unitPrice",
            fieldLabel: "Current price per unit",
        },
    ],
    selectableFields: [
        {
            fieldName: "categoryName",
            fieldLabel: "Category of product",
            fetchAvailableOptions: fetchCategories,
        },
    ],
};

export const listConfigs: ComponentConfig[] = [
    categoriesConfig,
    companiesConfig,
    productsConfig,
];