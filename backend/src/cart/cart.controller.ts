import { Controller } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { CartService } from './cart.service';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
}
