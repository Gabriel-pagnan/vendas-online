import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { ProductService } from '../product/product.service';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { CountProductDTO } from '../product/dtos/count-product.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,

        private readonly productService: ProductService
    ) {}

    findAmountCategoryInProducts(category: CategoryEntity, countList: CountProductDTO[]) {
        const count = countList.find((itemCount) => itemCount.category_id === category.id);

        if(count) return count.total;
        return 0;
    }

    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        const categories = await this.categoryRepository.find({
            order: {id: 'asc'}
        });
        const count = await this.productService.countProductsByCategoryId();

        if(!categories || categories.length === 0) throw new NotFoundException('Category empty')

        return categories.map(
            (category) => new ReturnCategoryDTO(
                category, 
                this.findAmountCategoryInProducts(category, count)
            )
        );
    }

    async createCategory(data: CreateCategoryDTO): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(data.name).catch(() => undefined);

        if(category) throw new BadRequestException(`Category name ${data.name} exist`)
        return this.categoryRepository.save(data)
    }

    async findCategoryById(id: number, isRelations?: boolean): Promise<CategoryEntity> {
        const relations = isRelations ? {
            products: true
        } : undefined
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations
        });

        if(!category) throw new NotFoundException(`Category id: ${id} not Found`)
        return category
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne(({
            where: {name}
        }));

        if(!category) throw new NotFoundException(`Category name ${name} not found`);

        return category
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        const category = await this.findCategoryById(id, true);
        if(category.products?.length > 0) {
            throw new BadRequestException('Category with relations')
        }

        return this.categoryRepository.delete({id: id})
    }

    async editCategory(id: number, data: UpdateCategoryDTO): Promise<CategoryEntity> {
        const category = await this.findCategoryById(id);

        return this.categoryRepository.save({
            ...category,
            ...data
        })
    }
}
