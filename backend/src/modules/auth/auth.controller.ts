import { Body, Param, Controller, Post, Get, HttpStatus } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { UserLoginDto } from "./dtos/login.dto";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";
import {
  GetUser,
  UserProtected,
} from "src/common/auth/decorators/auth.decorator";
import { IAuthUser } from "src/common/auth/interfaces/jwt.interface";
import { IResponse } from "src/common/response/interfaces/response.interface";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from "./dtos/change-password.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post("login")
  @ResponseMessage("login success")
  @ApiOperation({
    summary: "User Login",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "login Success",
  })
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.login(body);

    return { data };
  }

  @Get("session")
  @UserProtected()
  @ApiBearerAuth("accessToken")
  @ResponseMessage("Session retrieved successfully")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Session retrieved successfully",
  })
  @ApiOperation({
    summary: "Get User session",
  })
  async getSession(
    @GetUser() authUser: IAuthUser,
  ): Promise<IResponse<boolean>> {
    const userId = authUser.id;

    if (userId) {
      return {
        data: true,
      };
    } else {
      return {
        data: false,
      };
    }
  }

  @Post("forgot-password")
  @ResponseMessage("Check your email")
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Check your email",
  })
  @ApiOperation({
    summary: "Forgot Password",
  })
  async forgotPassword(
    @Body() data: ForgotPasswordDto,
  ): Promise<IResponse<void>> {
    const response = await this.authService.forgotPassword(data.email);
    return {};
  }

  @Post("reset-password/token/:token/email/:email")
  @ResponseMessage("Password Changed successfully")
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Password Changed successfully",
  })
  @ApiOperation({
    summary: "Reset Password",
  })
  async resetPassword(
    @Param("token") token: string,
    @Param("email") email: string,
    @Body() data: ResetPasswordDto,
  ): Promise<IResponse<string>> {
    const response = await this.authService.resetPassword({
      password: data.password,
      token: token,
      email: email,
    });

    return {
      data: response,
    };
  }
}
