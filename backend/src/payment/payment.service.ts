import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.enttity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-cart.entity';
import { PaymentType } from '../payment-status/enums/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { ProductEntity } from '../product/entities/producy.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { CartProductEntity } from '../cart-product/entities/cart-product.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity) 
            private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    async createPayment(data: CreateOrderDTO, products: ProductEntity[], cart: CartEntity):Promise<PaymentEntity> {
        const finalPrice = cart.cartProduct?.map((cartProduct: CartProductEntity) => {
            const product = products.find((product) => product.id === cartProduct.productId);
            if(product) {
                return cartProduct.amount * product.price
            }
            return 0
        }).reduce((accumulator, currentValue) => accumulator + currentValue ,0)

        if(data.amountPayments){
            const paymentCreditCart = new PaymentCreditCardEntity(
                PaymentType.Done, 
                finalPrice, 0, 
                finalPrice, 
                data
            );
            return this.paymentRepository.save(paymentCreditCart)
        }else if(data.codePix && data.datePayment) {
            const paymentPixCart = new PaymentPixEntity(
                PaymentType.Done, 
                finalPrice, 0, 
                finalPrice, 
                data
            );
            return this.paymentRepository.save(paymentPixCart)
        }

        throw new BadRequestException('Amount Payment or code pix not found')
    }
}
