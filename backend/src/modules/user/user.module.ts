import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "src/common/prisma/prisma";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
