import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { ReturnCepDTO } from './dtos/return-cep.dto';

@Injectable()
export class CorreiosService {
    constructor(private readonly httpService: HttpService) { }

    async findAddress(cep: string): Promise<ReturnCepDTO> {
        const returnCep: ReturnCepDTO = await this.httpService.axiosRef
            .get<ReturnCepDTO>(process.env.URL_CEP_CORREIOS.replace('{CEP}', cep))
            .then((res) => {
                if(res.data.error === 'true') throw new NotFoundException('CEP not found')
                return res.data
            })
            .catch((err: AxiosError) => {
                throw new BadRequestException(`Error in connection request ${err.message}`)
            })
        
        return returnCep
    }
}
