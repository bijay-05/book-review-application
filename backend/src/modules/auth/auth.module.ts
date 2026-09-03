import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { KeyValueModule } from "src/common/key-value/key-value.module";
import { BullQueueModule } from "src/common/bull-queue/bull-queue.module";

@Module({
  imports: [
    JwtModule,
    UserModule,
    KeyValueModule.forRoot({ useRedis: true }),
    BullQueueModule,
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
