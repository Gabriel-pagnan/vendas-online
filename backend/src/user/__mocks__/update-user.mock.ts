import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const UpdatePasswordMock: UpdatePasswordDTO = {
    lastPassword: 'abc',
    newPassword: 'asdasd'
}

export const UpdatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: 'asdasd',
    newPassword: 'teste'
}
