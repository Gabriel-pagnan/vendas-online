import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { UserId } from '../decorators/user-id.decorator';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async insertCart(@Body() data: InsertCartDTO, @UserId() id: number): Promise<CartEntity> {
        return await this.cartService.insertProductCart(data, id)
    }
}
