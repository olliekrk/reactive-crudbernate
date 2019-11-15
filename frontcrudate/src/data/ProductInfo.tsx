import {ListItem} from "../model/ComponentConfig";

export interface ProductInfo extends ListItem {
    productName: string,
    description?: string,
}