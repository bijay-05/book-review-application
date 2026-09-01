import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ICreateUser } from "../interfaces/user.interface";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto implements ICreateUser {
  @ApiProperty({
    name: "email",
    type: "string",
    required: true,
    example: "hello@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: "name",
    type: "string",
    required: true,
    example: "John Mayer",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: "password",
    type: "string",
    required: true,
    example: "secret123",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
