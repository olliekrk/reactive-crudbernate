import {FieldConfig} from "./FieldConfig";

export interface ListItem {
    id: number,
}

export interface ComponentConfig {
    componentEndpoint: string,
    componentTitle: string,
    headerValues: any[],
    itemToValues: (item: ListItem) => any[],
    fieldConfigs: FieldConfig[],
}