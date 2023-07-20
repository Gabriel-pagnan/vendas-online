import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) 
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
    ) {}

    async createOrder(data: CreateOrderDTO, cartId: number): Promise<OrderEntity> {
        await this.paymentService.createPayment(data)
        return null
    }
}
