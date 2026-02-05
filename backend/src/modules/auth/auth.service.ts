import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserLogin } from "./interfaces/login.interface";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginData: IUserLogin) {
    const user = await this.userService.getByEmail(loginData.email);

    if (!user) {
      throw new NotFoundException("Email or password doesn't match::looks");
    }

    const doesPasswordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!doesPasswordMatch) {
      throw new NotFoundException("Email or password doesn't match");
    }

    const accessToken = this._jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: "abcde12345",
        expiresIn: "1hr",
      },
    );

    return { accessToken };
  }
}
