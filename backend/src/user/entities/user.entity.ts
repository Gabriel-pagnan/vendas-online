import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { AddressEntity } from '../../address/entities/address.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'phone', nullable: false})
    phone: string;

    @Column({name: 'cpf'})
    cpf: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({name: 'type_user', nullable: false})
    typeUser: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(()=> AddressEntity, (addresses) => addresses.user)
    addresses?: AddressEntity[];

    orders: OrderEntity[]
}