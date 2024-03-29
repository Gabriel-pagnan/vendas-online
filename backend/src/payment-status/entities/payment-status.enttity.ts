import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { PaymentEntity } from '../../payment/entities/payment.enttity';

@Entity({name: 'city'})
export class PaymentStatusEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => PaymentEntity, (payment) => payment.paymentStatus)
    payments?: PaymentEntity[];
}