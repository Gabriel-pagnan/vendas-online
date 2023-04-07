import { Body, Controller, Post } from '@nestjs/common';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    async login(@Body() data: LoginDTO): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.authService.login(data))
    }
}
