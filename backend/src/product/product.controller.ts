import { Controller, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { ReturnProductDTO } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/producy.entity';
import { CreateProductDTO } from './dtos/create-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll(): Promise<ReturnProductDTO[]> {
        return (
            await this.productService.findAll()).map((product) => new ReturnProductDTO(product)
            )
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() data: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(data);
    }
}
