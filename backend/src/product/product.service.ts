import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/producy.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';

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

    async findProductById(id: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {id: id}
        })

        if(!product) throw new NotFoundException(`Product id: ${id} not found`)
        return product
    }

    async deleteProduct(id: number): Promise<DeleteResult> {
        await this.findProductById(id)
        return this.productRepository.delete(id);
    }

    async updateProduct(id: number, data: UpdateProductDTO): Promise<ProductEntity> {
        const product = await this.findProductById(id);
        return this.productRepository.save({...product, ...data})
    }
}
