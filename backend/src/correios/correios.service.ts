import { AxiosError } from 'axios';
import { Client } from 'nestjs-soap';
import { HttpService } from '@nestjs/axios';
import { CityService } from '../city/city.service';
import { ReturnCepDTO } from './dtos/return-cep.dto';
import { ReturnCepExternalDTO } from './dtos/return-cep-external.dto';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ResponsePriceCorreios } from './dtos/response-price.dto';
import { CdFormatEnum } from './enums/cd.format.enum';
import { SizeProductDTO } from './dtos/size.product.dto';

@Injectable()
export class CorreiosService {
    constructor(
        @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
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

    async findPriceDelivery(cdService: string, cep: string, sizeProduct: SizeProductDTO): Promise<ResponsePriceCorreios> {
        return new Promise((resolve) => {
            this.soapClient.CalcPrecoPrazo({
                nCdServico: cdService,
                sCepOrigem: process.env.CEP_COMPANY,
                sCepDestino: cep,
                nCdFormato: CdFormatEnum.BOX,
                nVlPeso: sizeProduct.weight,
                nVlComprimento: sizeProduct.length,
                nVlAltura: sizeProduct.height,
                nVlLargura: sizeProduct.width,
                nVlDiametro: sizeProduct.diameter,
                nCdEmpresa: '',
                sDsSenha: '',
                sCdMaoPropria: 'N',
                nVlValorDeclarado: sizeProduct.productValue < 25 ? 0 : sizeProduct.productValue,
                sCdAvisoRecebimento: 'N',
            }, (_, res: ResponsePriceCorreios) => {
                if (res) {
                    resolve(res)
                } else {
                    throw new BadRequestException('Error SOAP');
                }
            })
        })
    }
}
