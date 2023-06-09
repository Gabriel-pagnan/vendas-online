import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if(!categories || categories.length === 0) throw new NotFoundException('Category empty')

        return categories;
    }

    async createCategory(data: CreateCategoryDTO): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(data.name).catch(() => undefined);

        if(category) throw new BadRequestException(`Category name ${data.name} exist`)
        return this.categoryRepository.save(data)
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne(({
            where: {name}
        }));

        if(!category) throw new NotFoundException(`Category name ${name} not found`);

        return category
    }
}
