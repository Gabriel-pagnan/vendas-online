import { ReturnUserDTO } from "../../user/dtos/returnUser.dto";

export interface Returnlogin {
    user: ReturnUserDTO,
    access_token: string
}