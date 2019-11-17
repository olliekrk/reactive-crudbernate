import {ListItem} from "../model/ComponentConfig";

export interface Address {
    country?: string,
    city?: string,
    street?: string,
}

export interface CustomerInfo extends ListItem, Address {
    email: string,
    firstName?: string,
    lastName?: string,
    companyName?: string,
}