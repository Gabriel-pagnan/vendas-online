import { ReturnProductDTO } from "../../product/dtos/return-product.dto";
import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategoryDTO {
    id: number;
    name: string;
    amountProducts?: number;
    // products?: ReturnProductDTO[];

    constructor(category: CategoryEntity, amountProducts?: number) {
        this.id = category.id;
        this.name = category.name;
        this.amountProducts = amountProducts;
        // this.products = category.products
        // ? category.products.map((product) => new ReturnProductDTO(product))
        // : undefined;
    }
}