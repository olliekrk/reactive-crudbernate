import {ListItem} from "../model/ComponentConfig";

export interface CategoryInfo extends ListItem {
    categoryName: string,
    description?: string,
}