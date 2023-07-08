import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Delete, Param, Patch } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { UpdateCartDTO } from './dtos/update-cart.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @UsePipes(ValidationPipe)
    @Post()
    async insertCart(@Body() data: InsertCartDTO, @UserId() id: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.insertProductCart(data, id))
    }

    @Get()
    async findCartByUserId(@UserId() id: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.findCartByUserId(id, true));
    }

    @Delete()
    async clearCart(@UserId() userId: number): Promise<DeleteResult> {
        return this.cartService.clearCart(userId);
    }

    @Delete('/product/:id')
    async deleteProductCart(@Param('id') id:number, @UserId() userId: number): Promise<DeleteResult> {
        return this.cartService.deleteProductCart(id, userId)
    }

    @Patch()
    async updateProductInCart(@Body() data: UpdateCartDTO, @UserId() id: number):Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.updateProductInCart(data, id))
    }
}
