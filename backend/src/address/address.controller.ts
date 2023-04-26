import { Controller, Body, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { UserId } from '../decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService){}

    @Post()
    async create(@Body() data: CreateAddressDTO, @UserId() userId: number): Promise<AddressEntity>{
        return this.addressService.create(data, userId)
    }

}
