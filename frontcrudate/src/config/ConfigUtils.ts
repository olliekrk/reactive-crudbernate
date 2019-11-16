import {SelectableOption} from "../model/FormField";
import {categoriesConfig} from "./ListConfigs";
import {CategoryInfo} from "../data/CategoryInfo";

export function fetchCategories(): Promise<SelectableOption[]> {
    return fetch(`/API${categoriesConfig.componentEndpoint}/all`)
        .then(response => response.json())
        .then((categories: CategoryInfo[]) =>
            categories.map(c => ({
                optionValue: c.categoryName,
                optionLabel: c.categoryName,
            } as SelectableOption))
        );
}