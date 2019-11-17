import {SelectableOption} from "../model/FormField";
import {categoriesConfig, companiesConfig} from "./ListConfigs";
import {CategoryInfo} from "../data/CategoryInfo";
import {CompanyInfo} from "../data/CompanyInfo";

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