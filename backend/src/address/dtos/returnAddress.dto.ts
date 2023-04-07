import { ReturnCityDTO } from "../../city/dtos/returnCity.dto"
import { AddressEntity } from "../entities/address.entity"

export class ReturnAddressDTO {
    complement: string;
    number: number;
    cep: string;
    city?: ReturnCityDTO;

    constructor(address: AddressEntity){
        this.complement = address.complement;
        this.number = address.number;
        this.cep = address.cep; 
        this.city = address.city 
        ? new ReturnCityDTO(address.city)
        : undefined
    }
}