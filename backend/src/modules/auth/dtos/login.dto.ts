import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { IUserLogin } from "../interfaces/login.interface";

export class UserLoginDto implements IUserLogin {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
