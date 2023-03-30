import { IsString, IsOptional } from "class-validator";


export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
