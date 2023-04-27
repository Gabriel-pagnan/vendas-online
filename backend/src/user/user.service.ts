import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

    async create(data: CreateUserDTO): Promise<UserEntity> {
        const user = await this.findUserByEmail(data.email).catch(() => undefined);
        if(user){
            throw new BadGatewayException('E-mail já cadastrado');
        }

        const salt = 10;
        const passwordHash = await hash(data.password, salt);

        return this.userRepository.save({
            ...data,
            typeUser: 1,
            password: passwordHash
        }); 
    }

    async getUserReferences(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {id: userId},
            relations: {
                addresses: {
                    city: {state: true}
                }
            }
        })
    }

    async getAll(): Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    async getById(userId: number): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user) throw new NotFoundException('Usuário não encontrado.')
        return user
    }

    async findUserByEmail(email: string): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if(!user) throw new NotFoundException('E-mail já cadastrado.')
        return user
    }
}
