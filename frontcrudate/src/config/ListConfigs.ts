import {ComponentConfig} from "../model/ComponentConfig";
import {CategoryInfo} from "../data/CategoryInfo";
import {CompanyInfo} from "../data/CompanyInfo";
import {ProductInfo} from "../data/ProductInfo";
import {fetchCategories, fetchCompanies, fetchCustomers, fetchProducts} from "./OptionUtils";
import {CustomerInfo} from "../data/CustomerInfo";
import {OrderInfo} from "../data/OrderInfo";

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

export const customersConfig: ComponentConfig = {
    componentEndpoint: "/customers",
    componentTitle: "Customers",
    headerValues: [
        "Id",
        "E-mail",
        "First Name",
        "Last Name",
        "Company",
        "Country",
        "City",
        "Street",
        "Orders made",
        "Actions",
    ],
    itemToValues: (item) => {
        const customer = item as CustomerInfo;
        return [
            customer.id,
            customer.email,
            customer.firstName || "No data",
            customer.lastName || "No data",
            customer.companyName || "No data",
            customer.country || "No data",
            customer.city || "No data",
            customer.street || "No data",
            customer.ordersCount || 0,
        ];
    },
    fields: [
        {
            fieldName: "email",
            fieldLabel: "E-mail*",
        },
        {
            fieldName: "firstName",
            fieldLabel: "First name",
        },
        {
            fieldName: "lastName",
            fieldLabel: "Last name",
        },
        {
            fieldName: "country",
            fieldLabel: "Country",
        },
        {
            fieldName: "city",
            fieldLabel: "City",
        },
        {
            fieldName: "street",
            fieldLabel: "Street",
        },
    ],
    selectableFields: [
        {
            fieldName: "companyName",
            fieldLabel: "Company",
            fetchAvailableOptions: fetchCompanies
        },
    ],
};

export const ordersConfig: ComponentConfig = {
    componentEndpoint: "/orders",
    componentTitle: "Orders",
    headerValues: [
        "Id",
        "Ordered by",
        "Ordered product",
        "Quantity",
        "Price per unit",
        "Discount",
        "Total order value (with discount)",
        "Actions",
    ],
    itemToValues: (item) => {
        const order = item as OrderInfo;
        return [
            order.id,
            order.customerEmail,
            order.productName,
            order.quantity,
            order.unitPrice,
            order.discount || "Currently not available",
            order.totalValue
        ];
    },
    fields: [
        {
            fieldName: "quantity",
            fieldLabel: "Quantity",
        },
        {
            fieldName: "unitPrice",
            fieldLabel: "Price per unit",
        },
        {
            fieldName: "discount",
            fieldLabel: "Discount",
        },
    ],
    selectableFields: [
        {
            fieldName: "customerEmail",
            fieldLabel: "E-mail*",
            fetchAvailableOptions: fetchCustomers,
        },
        {
            fieldName: "productName",
            fieldLabel: "Product*",
            fetchAvailableOptions: fetchProducts,
        },
    ],
};

export const listConfigs: ComponentConfig[] = [
    categoriesConfig,
    productsConfig,
    companiesConfig,
    customersConfig,
    ordersConfig,
];