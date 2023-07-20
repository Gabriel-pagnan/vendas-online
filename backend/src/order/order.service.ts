import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) 
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    async createOrder(data: CreateOrderDTO, cartId: number): Promise<OrderEntity> {
        return 
    }
}
