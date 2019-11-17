import {ListItem} from "../model/ComponentConfig";

export interface OrderInfo extends ListItem {
    productName: string,
    customerEmail: string,
    unitPrice: number,
    quantity: number,
    discount?: number,
    totalValue: number,
}