import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(data)
  }

  @Get()
  async getAll(): Promise<UserEntity[]>{
    return this.userService.getAll()
  }
}
