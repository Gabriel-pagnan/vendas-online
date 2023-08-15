export interface InsertProductDTO {
    name: string;
    price: number;
    categoryId?: number;
    image: string;
    weight: number;
    length: number;
    height: number;
    width: number;
    diameter: number;
}