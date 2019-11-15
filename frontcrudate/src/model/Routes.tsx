import {ComponentConfig} from "./ComponentConfig";
import {CategoryInfo} from "../data/CategoryInfo";
import {CompanyInfo} from "../data/CompanyInfo";

const categoriesConfig: ComponentConfig = {
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

const companiesConfig: ComponentConfig = {
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

export const appRoutesConfigs: ComponentConfig[] = [
    categoriesConfig,
    companiesConfig,
];