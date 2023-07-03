import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { Returnlogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { validatePassword } from '../utils/password';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(login: LoginDTO): Promise<Returnlogin> {
        const user = await this.userService.findUserByEmail(login.email).catch(() => undefined);

        const isMatch = await validatePassword(login.password, user?.password || '')

        if (user)
            if (!user || !isMatch) throw new NotFoundException('E-mail ou senha inválidos')

        return {
            access_token: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDTO(user)
        }
    }
}
