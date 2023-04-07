import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
 
    async login(login: LoginDTO): Promise<UserEntity> {
        const user = await this.userService.getByEmail(login.email).catch(() => undefined);

        const isMatch = await compare(login.password, user?.password || '');

        if(user) 
        if(!user || !isMatch) throw new NotFoundException('E-mail ou senha inválidos')

        return user
    }
}
