import { Body, Controller, Get, Post, Param, Patch, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
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

  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() data: CreateUserDTO): Promise<UserEntity> {
      return this.userService.create(data, UserType.Admin)
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(data)
  }

  @Roles(UserType.Root, UserType.Admin)
  @Get('/all')
  async getAll(): Promise<ReturnUserDTO[]>{
    return (await this.userService.getAll()).map((userEntity) => new ReturnUserDTO(userEntity))
  }
  @Roles(UserType.Root, UserType.Admin)
  @Get(':userId')
  async getById(@Param('userId') userId: number): Promise<ReturnUserDTO>{
    return new ReturnUserDTO(
      await this.userService.getUserReferences(userId)
    );
  }

  @Roles(UserType.Root, UserType.User, UserType.User)
  @Patch()
  async updatePasswordUser(@UserId() id: number, @Body() data: UpdatePasswordDTO): Promise<UserEntity> {
    return this.userService.updatePasswordUser(data, id)
  }

  @Roles(UserType.Root, UserType.Admin)
  @Get()
  async getInfoUser(@UserId() id: number): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(await this.userService.getUserReferences(id))
  }
}
