import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enums/enum.type";

export const userEntityMock: UserEntity = {
    cpf: '12345678977',
    createdAt: new Date(),
    email: 'emailteste@gmail.com',
    id: 654,
    name: 'teste',
    password: '123456',
    phone: '131516515',
    typeUser: UserType.User,
    updatedAt: new Date()
}