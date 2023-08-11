import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { ReturnOrderDTO } from './dtos/return-order.dto';

@Roles(UserType.Root, UserType.User)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() data: CreateOrderDTO, 
        @UserId() userId: number
    ) {
        return this.orderService.createOrder(data, userId)
    } 

    @Get()
    async findOrdersByUserId(@UserId() userId: number) {
        return this.orderService.findOrdersByUserId(userId)
    }

    @Roles(UserType.Root)
    @Get('/all')
    async findAllOrders(): Promise<ReturnOrderDTO[]> {
        return (await this.orderService.findAllOrders())
            .map((order) => new ReturnOrderDTO(order))
    }

    @Roles(UserType.Root)
    @Get('/:orderId')
    async findOrderById(@Param('orderId') orderId: number): Promise<ReturnOrderDTO> {
        return new ReturnOrderDTO(
            (await this.orderService.findOrdersByUserId(undefined, orderId))[0]
        )
    }
}
