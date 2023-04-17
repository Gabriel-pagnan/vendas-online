import { Controller, Body, Post, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService){}

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async create(@Body() data: CreateAddressDTO, @Param('userId') userId: number): Promise<AddressEntity>{
        return this.addressService.create(data, userId)
    }

}
