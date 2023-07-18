import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderProductEntity])],
})
export class OrderProductModule {}
