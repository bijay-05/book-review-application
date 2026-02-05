import { Module } from "@nestjs/common";
import { ResponseModule } from "./response/response.module";
import { PrismaModule } from "./prisma/prisma";
import { ErrorModule } from "./error/error.module";
import { LoggerModule } from "./logger/logger.module";
import { DebuggerModule } from "./debugger/debugger.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    ErrorModule,
    LoggerModule,
    DebuggerModule,
    PrismaModule,
    ResponseModule,
  ],
})
export class CommonModule {}
