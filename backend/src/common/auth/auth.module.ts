import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "src/modules/user/user.module";

@Module({
  imports: [JwtModule, PassportModule],
  providers: [JwtAuthStrategy],
})
export class AuthModule {}
