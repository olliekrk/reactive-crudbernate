import {ListItem} from "../ListComponent";

export interface ProductInfo extends ListItem {
    productName: string,
    description?: string,
}