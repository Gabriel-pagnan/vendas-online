import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    
    @Get()
    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        return(
            await this.categoryService.findAllCategories()
        ).map((category) => new ReturnCategoryDTO(category))
    }
}
