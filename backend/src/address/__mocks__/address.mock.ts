import { cityMock } from "../../city/__mocks__/state.mock";
import { userEntityMock } from "../../user/__mocks__/user.mock";
import { AddressEntity } from "../entities/address.entity";

export const addressMock: AddressEntity = {
    cep: '6446546',
    cityId: cityMock.id,
    complement: 'asdasd',
    createdAt: new Date(),
    id: 978,
    number: 464,
    updatedAt: new Date(),
    userId: userEntityMock.id,
    orders: []
}