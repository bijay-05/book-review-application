import { Body, Controller, Post, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/login.dto";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";
import {
  GetUser,
  UserProtected,
} from "src/common/auth/decorators/auth.decorator";
import { IAuthUser } from "src/common/auth/interfaces/jwt.interface";
import { IResponse } from "src/common/response/interfaces/response.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ResponseMessage("login success")
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.login(body);

    return { data };
  }

  @Get("session")
  @UserProtected()
  @ResponseMessage("Session retrieved successfully")
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
}
