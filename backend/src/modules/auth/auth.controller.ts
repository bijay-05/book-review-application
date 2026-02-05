import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/login.dto";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ResponseMessage("login success")
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.login(body);

    return { data };
  }
}
