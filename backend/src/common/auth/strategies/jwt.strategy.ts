import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtUser } from "../interfaces/jwt.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("auth.accessToken.secretKey", ""),
      ignoreExpiration: false,
    });
  }

  async validate(data: IJwtUser): Promise<IJwtUser> {
    return data;
  }
}
