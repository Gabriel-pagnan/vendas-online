import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { CityEntity } from './entities/city.entity';
import { NotFoundException } from '@nestjs/common/exceptions'; 

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity) 
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) { }

    async getAllCityStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`,
            () => this.cityRepository.find({
                where: { stateId }
            })
        )
    }

    async getById(id: number): Promise<CityEntity> {
       const city = await this.cityRepository.findOne({
        where: {id: id}
       })    
       if(!city) throw new NotFoundException('cidade não encontrada.')

       return city
    }
}
