import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { ReturnCepExternalDTO } from './dtos/return-cep-external.dto';
import { CityService } from '../city/city.service';

@Injectable()
export class CorreiosService {
    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService
    ) { }

    async findAddress(cep: string): Promise<ReturnCepExternalDTO> {
        const returnCep: ReturnCepExternalDTO = await this.httpService.axiosRef
            .get<ReturnCepExternalDTO>(process.env.URL_CEP_CORREIOS.replace('{CEP}', cep))
            .then((res) => {
                if(res.data.error === 'true') throw new NotFoundException('CEP not found')
                return res.data
            })
            .catch((err: AxiosError) => {
                throw new BadRequestException(`Error in connection request ${err.message}`)
            })
        
        const city = await this.cityService.findCityByName(returnCep.localidade, returnCep.uf)
        
        return returnCep
    }
}
