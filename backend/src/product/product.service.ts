import { Injectable, NotFoundException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/producy.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CountProductDTO } from './dtos/count-product.dto';
import { SizeProductDTO } from '../correios/dtos/size.product.dto';
import { CorreiosService } from '../correios/correios.service';
import { CdServiceEnum } from '../correios/enums/cd-service.enum';
import { ReturnPriceDeliveryDTO } from './dtos/return-price-delivery.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
        private readonly correioService: CorreiosService
    ) { }

    async findAll(productId?: number[], isFindRelations?: boolean): Promise<ProductEntity[]> {
        let findOptions = {};

        if (productId && productId.length > 0) {
            findOptions = {
                where: {
                    id: In(productId),
                },
            }
        }
        if(isFindRelations) {
            findOptions = {
                ...findOptions,
                relations: {
                    category: true
                }
            }
        }

        const products = await this.productRepository.find(findOptions);

        if (!products || products.length === 0) {
            throw new NotFoundException('Not found produtcs')
        }
        return products
    }

    async createProduct(data: CreateProductDTO): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(data.categoryId);

        return this.productRepository.save({ 
            ...data,
            weight: data.weight || 0,
            width: data.width || 0,
            length: data.length || 0,
            diameter: data.diameter || 0,
            height: data.height || 0
        })
    }

    async findProductById(id: number, isRelations?: boolean): Promise<ProductEntity> {
        const relations = isRelations ? {
            category: true
        } : undefined

        const product = await this.productRepository.findOne({
            where: { id },
            relations
        })

        if (!product) throw new NotFoundException(`Product id: ${id} not found`)
        return product
    }

    async deleteProduct(id: number): Promise<DeleteResult> {
        await this.findProductById(id)
        return this.productRepository.delete(id);
    }

    async updateProduct(id: number, data: UpdateProductDTO): Promise<ProductEntity> {
        const product = await this.findProductById(id);
        return this.productRepository.save({ ...product, ...data })
    }

    async countProductsByCategoryId(): Promise<CountProductDTO[]> {
        return this.productRepository.createQueryBuilder('product')
        .select('product.category_id, COUNT(*) as total')
        .groupBy('product.category_id')
        .getRawMany();
    }

    async findPriceDelivery(cep: string, productId: number): Promise<any> {
        const product = await this.findProductById(productId);
        const sizeProduct = new SizeProductDTO(product);
        const resultPrice = await Promise.all([
            this.correioService.findPriceDelivery(CdServiceEnum.PAC, cep, sizeProduct),
            this.correioService.findPriceDelivery(CdServiceEnum.SEDEX, cep, sizeProduct),
            this.correioService.findPriceDelivery(CdServiceEnum.SEDEX_10, cep, sizeProduct)
        ]).catch(() => {throw new BadRequestException('Error find delivery')})
        

        return new ReturnPriceDeliveryDTO(resultPrice)
    }
}
