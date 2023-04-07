import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { Returnlogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    async login(@Body() data: LoginDTO): Promise<Returnlogin> {
        return await this.authService.login(data);
    }
}
