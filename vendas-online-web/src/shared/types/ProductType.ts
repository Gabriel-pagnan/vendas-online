import { CategoryType } from "./CategoryTypes";

export interface ProductType {
    id: number,
    name: string,
    image: string,
    price: string,
    category?: CategoryType,
}