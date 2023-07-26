import { Controller, Body, Post, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enums/enum.type';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDTO } from './dtos/returnAddress.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService){}
    
    @Roles(UserType.User)
    @Post()
    async create(@Body() data: CreateAddressDTO, @UserId() userId: number): Promise<AddressEntity>{
        return this.addressService.create(data, userId)
    }

    @Roles(UserType.User, UserType.Root)
    @Get()
    async findAddressByUserId(@UserId() userId: number): Promise<ReturnAddressDTO[]>{
        return (await this.addressService.findAddressByUserId(userId)).map((address) => new ReturnAddressDTO(address))
    }

}
