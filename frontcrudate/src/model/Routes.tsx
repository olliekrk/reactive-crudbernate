import {ComponentConfig} from "./ComponentConfig";
import {CategoryInfo} from "../data/CategoryInfo";

export const appRoutesConfigs: ComponentConfig[] = [
    {
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
        fieldConfigs: [
            {
                fieldName: "categoryName",
                fieldLabel: "Name of the category",
            },
            {
                fieldName: "description",
                fieldLabel: "Description",
            },
        ],
    },
];