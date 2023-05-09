import { cityMock } from "../../city/__mocks__/state.mock";
import { CreateAddressDTO } from "../dtos/createAddress.dto";
import { addressMock } from "./address.mock";

export const createAddressMock: CreateAddressDTO = {
    cep: addressMock.cep,
    cityId: cityMock.id,
    complement: addressMock.complement,
    number: addressMock.number
}