import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.enttity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-cart.entity';
import { PaymentType } from '../payment-status/enums/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity) 
            private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    async createPayment(data: CreateOrderDTO):Promise<PaymentEntity> {
        if(data.amountPayments){
            const paymentCreditCart = new PaymentCreditCardEntity(PaymentType.Done, 0, 0, 0, data)
            return this.paymentRepository.save(paymentCreditCart)
        }else if(data.codePix && data.datePayment) {
            const paymentPixCart = new PaymentPixEntity(PaymentType.Done, 0, 0, 0, data)
            return this.paymentRepository.save(paymentPixCart)
        }

        throw new BadRequestException('Amount Payment or code pix not found')
    }
}
