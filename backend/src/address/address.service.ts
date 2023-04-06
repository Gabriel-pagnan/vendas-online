import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
    constructor(
    @InjectRepository(AddressEntity) 
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService
    ){}

    async create(data: CreateAddressDTO, userId: number): Promise<AddressEntity>{
        await this.userService.getById(userId);
        await this.cityService.getById(data.cityId)
        return this.addressRepository.save({
            ...data,
            userId
        });
    }
}
