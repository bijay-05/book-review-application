import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({
    name: "oldPassword",
    type: "string",
    required: true,
    example: "secret123",
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    name: "newPassword",
    type: "string",
    required: true,
    example: "secret12345",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    name: "email",
    type: "string",
    required: true,
    example: "hello@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    name: "password",
    type: "string",
    required: true,
    example: "secret123",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
