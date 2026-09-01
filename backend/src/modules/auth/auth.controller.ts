import { Body, Controller, Post, Get, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
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

@ApiTags("Authentication")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

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
  async forgotPassword(): Promise<IResponse<void>> {
    return {};
  }
}
