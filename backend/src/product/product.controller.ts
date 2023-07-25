import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Delete, Param, Put } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { ReturnProductDTO } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/producy.entity';
import { CreateProductDTO } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ReturnPriceDeliveryDTO } from './dtos/return-price-delivery.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Roles(UserType.Admin, UserType.User)
    @Get()
    async findAll(): Promise<ReturnProductDTO[]> {
        return (
            await this.productService.findAll([], true)).map((product) => new ReturnProductDTO(product)
            )
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() data: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(data);
    }

    @Roles(UserType.Admin)
    @Delete('/:id')
    async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
        return await this.productService.deleteProduct(id);
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDTO): Promise<ProductEntity> {
        return await this.productService.updateProduct(id, data);
    }

    @Get(':productId/delivery/:cep')
    async findPriceDelivery(@Param('cep') cep: string, productId: number): Promise<ReturnPriceDeliveryDTO> {
        return this.productService.findPriceDelivery(cep, productId)
    }
}
