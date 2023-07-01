import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(data)
  }

  @Get()
  async getAll(): Promise<ReturnUserDTO[]>{
    return (await this.userService.getAll()).map((userEntity) => new ReturnUserDTO(userEntity))
  }

  @Get(':userId')
  async getById(@Param('userId') userId: number): Promise<ReturnUserDTO>{
    return new ReturnUserDTO(
      await this.userService.getUserReferences(userId)
    );
  }

  @Patch()
  async updatePasswordUser(@UserId() id: number, @Body() data: UpdatePasswordDTO): Promise<UserEntity> {
    return this.userService.updatePasswordUser(data, id)
  }
}
