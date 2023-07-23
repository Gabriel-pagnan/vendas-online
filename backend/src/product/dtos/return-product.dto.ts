import { ReturnCategoryDTO } from "../../category/dto/return-category.dto";
import { ProductEntity } from "../entities/producy.entity";

export class ReturnProductDTO {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: ReturnCategoryDTO;

    constructor(product: ProductEntity) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.category = product.category ? new ReturnCategoryDTO(product) : undefined
    }
}