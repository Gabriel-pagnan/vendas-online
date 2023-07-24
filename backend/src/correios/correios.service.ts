import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CityService } from '../city/city.service';
import { ReturnCepDTO } from './dtos/return-cep.dto';
import { ReturnCepExternalDTO } from './dtos/return-cep-external.dto';

@Injectable()
export class CorreiosService {
    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService
    ) { }

    async findAddress(cep: string): Promise<ReturnCepDTO> {
        const returnCep: ReturnCepExternalDTO = await this.httpService.axiosRef
            .get<ReturnCepExternalDTO>(process.env.URL_CEP_CORREIOS.replace('{CEP}', cep))
            .then((res) => {
                // if(res.data.erro === 'true') throw new NotFoundException('CEP not found')
                return res.data
            })
            .catch((err: AxiosError) => {
                throw new BadRequestException(`Error in connection request ${err.message}`)
            })
        
        const city = await this.cityService.findCityByName(returnCep.localidade, returnCep.uf)
            .catch(() => undefined)
        
        return new ReturnCepDTO(returnCep, city?.id, city?.state?.id)
    }
}
