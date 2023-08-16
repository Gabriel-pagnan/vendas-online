import { CategoryType } from "./CategoryTypes";

export interface ProductType {
    id: number,
    name: string,
    image: string,
    price: number,
    category?: CategoryType,
    diameter: number,
    width: number,
    length: number,
    height: number,
    weight: number
}