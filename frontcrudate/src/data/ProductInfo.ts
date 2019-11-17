import {ListItem} from "../model/ComponentConfig";

export interface ProductInfo extends ListItem {
    productName: string,
    categoryName?: string,
    description?: string,
    unitPrice?: number,
}