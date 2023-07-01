import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enums/enum.type';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

    async create(data: CreateUserDTO): Promise<UserEntity> {
        const user = await this.findUserByEmail(data.email).catch(() => undefined);
        if(user){
            throw new BadGatewayException('E-mail já cadastrado');
        }
        const passwordHash = await createPasswordHashed(data.password)

        return this.userRepository.save({
            ...data,
            typeUser: UserType.User,
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

    async updatePasswordUser(data: UpdatePasswordDTO, id: number): Promise<UserEntity> {
        const user = await this.getById(id);
        const passwordHash = await createPasswordHashed(data.newPassword)

        const isMatch = await validatePassword(data.lastPassword, user.password || '')
        if(!isMatch) throw new BadRequestException('Last password invalid')

        return this.userRepository.save({...user, password: passwordHash})
    }
}
