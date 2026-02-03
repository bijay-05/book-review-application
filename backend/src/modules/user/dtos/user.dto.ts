import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ICreateUser } from "../interfaces/user.interface";

export class UserCreateDto implements ICreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
