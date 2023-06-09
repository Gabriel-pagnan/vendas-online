import { Body, Controller, Get, Post, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/role.decorator';
import { UserType } from './enums/enum.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(data)
  }

  @Roles(UserType.Admin)
  @Get()
  async getAll(): Promise<ReturnUserDTO[]>{
    return (await this.userService.getAll()).map((userEntity) => new ReturnUserDTO(userEntity))
  }
  @Roles(UserType.Admin)
  @Get(':userId')
  async getById(@Param('userId') userId: number): Promise<ReturnUserDTO>{
    return new ReturnUserDTO(
      await this.userService.getUserReferences(userId)
    );
  }
  @Roles(UserType.Admin, UserType.User)
  @Patch()
  async updatePasswordUser(@UserId() id: number, @Body() data: UpdatePasswordDTO): Promise<UserEntity> {
    return this.userService.updatePasswordUser(data, id)
  }
}
