import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.enttity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
        private readonly productService: ProductService,
    ) { }

    async saveOrder(
        data: CreateOrderDTO,
        userId: number,
        payment: PaymentEntity,
    ): Promise<OrderEntity> {
        return this.orderRepository.save({
            addressId: data.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId,
        });
    }

    async createOrder(data: CreateOrderDTO, cartId: number, userId: number): Promise<OrderEntity> {
        const payment: PaymentEntity = await this.paymentService.createPayment(data);
        const order = await this.saveOrder(data, userId, payment);
        const cart = await this.cartService.findCartByUserId(userId, true);

        cart.cartProduct?.forEach((cartProduct) => {
            this.orderProductService.createOrderProduct(
                cartProduct.productId,
                order.id,
                0,
                cartProduct.amount
            )
        })
        return null
    }
}
