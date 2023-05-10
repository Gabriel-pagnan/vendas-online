import { userEntityMock } from "../../user/__mocks__/user.mock";
import { LoginDTO } from "../dtos/login.dto";

export const loginMock: LoginDTO = {
    email: userEntityMock.email,
    password: 'abc',
}