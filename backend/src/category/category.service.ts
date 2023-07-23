import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { ProductService } from '../product/product.service';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { CountProductDTO } from '../product/dtos/count-product.dto';

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
        const categories = await this.categoryRepository.find();
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

    async findCategoryById(id: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({where: {id}})
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
}
