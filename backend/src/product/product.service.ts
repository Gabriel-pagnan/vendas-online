import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/producy.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if(!products || products.length === 0) {
            throw new NotFoundException('Not found produtcs')
        }
        return products
    }

    async createProduct(data: CreateProductDTO): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(data.categoryId);

        return this.productRepository.save({...data})
    }
}
