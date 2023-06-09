import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    
    @Roles(UserType.Admin)
    @Get()
    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        return(
            await this.categoryService.findAllCategories()
        ).map((category) => new ReturnCategoryDTO(category))
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(@Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
        return this.categoryService.createCategory(data)
    } 
}
