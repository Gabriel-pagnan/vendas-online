import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMock: CityEntity = {
    id: 844,
    name: 'teste',
    createdAt: new Date(),
    updatedAt: new Date(),
    stateId: stateMock.id,
}