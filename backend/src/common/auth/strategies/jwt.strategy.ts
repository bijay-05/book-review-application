import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtUser } from "../interfaces/jwt.interface";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "abcde12345",
      ignoreExpiration: false,
    });
  }

  async validate(data: IJwtUser): Promise<IJwtUser> {
    return data;
  }
}
