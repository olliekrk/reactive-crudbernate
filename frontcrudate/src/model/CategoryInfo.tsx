import {ListItem} from "../ListComponent";

export interface CategoryInfo extends ListItem {
    categoryName: string,
    description?: string,
}