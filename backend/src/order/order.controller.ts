import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorators/user-id.decorator';

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
}
