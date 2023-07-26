import { ReturnCategoryDTO } from "../../category/dto/return-category.dto";
import { ProductEntity } from "../entities/producy.entity";

export class ReturnProductDTO {
    id: number;
    name: string;
    price: number;
    image: string;
    weight: number;
    length: number;
    height: number;
    width: number;
    diameter: number;
    category?: ReturnCategoryDTO;

    constructor(product: ProductEntity) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.weight = product.weight;
        this.length = product.length;
        this.height = product.height;
        this.width = product.width;
        this.diameter = product.diameter;
        this.category = product.category ? new ReturnCategoryDTO(product.category) : undefined
    }
}