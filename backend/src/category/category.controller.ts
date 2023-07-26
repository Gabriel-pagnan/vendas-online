import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Root, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    
    @Get()
    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        return await this.categoryService.findAllCategories()
    }

    @Roles(UserType.Admin, UserType.Root)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(@Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
        return this.categoryService.createCategory(data)
    } 
    
    @Roles(UserType.Admin, UserType.Root)
    @Delete(':id')
    async deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(id)
    }
}
