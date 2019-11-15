import {FormField, FormSelectableField} from "./FormField";

export interface ListItem {
    id: number,
}

export interface ComponentConfig {
    componentEndpoint: string,
    componentTitle: string,
    headerValues: any[],
    itemToValues: (item: ListItem) => any[],
    fields: FormField[],
    selectableFields: FormSelectableField[],
}