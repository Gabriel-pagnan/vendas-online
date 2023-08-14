import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { ReturnProductDTO } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/producy.entity';
import { CreateProductDTO } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ReturnPriceDeliveryDTO } from './dtos/return-price-delivery.dto';
import { Pagination } from '../DTOs/paginations.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Roles(UserType.Root, UserType.Admin)
    @Get()
    async findAll(): Promise<ReturnProductDTO[]> {
        return (
            await this.productService.findAll([], true)).map((product) => new ReturnProductDTO(product)
            )
    }

    @Roles(UserType.Root, UserType.Admin)
    @Get('/page')
    async findAllPage(
        @Query('search') search?: string, 
        @Query('size') size?: number,
        @Query('page') page?: number,
    ): Promise<Pagination<ReturnProductDTO[]>> {
        return this.productService.findAllPage(search, size, page)
    }

    @Roles(UserType.Root, UserType.Admin, UserType.User)
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ReturnProductDTO> {
        return new ReturnProductDTO(await this.productService.findProductById(id, true))        
    }

    @Roles(UserType.Root, UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() data: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(data);
    }

    @Roles(UserType.Root, UserType.Admin)
    @Delete('/:id')
    async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
        return await this.productService.deleteProduct(id);
    }

    @Roles(UserType.Root, UserType.Admin)
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
