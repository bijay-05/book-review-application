import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { IUserLogin } from "../interfaces/login.interface";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto implements IUserLogin {
  @ApiProperty({
    name: "email",
    type: "string",
    required: true,
    example: "hello@gmail.com",
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    name: "password",
    type: "string",
    required: true,
    example: "Secret123",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
