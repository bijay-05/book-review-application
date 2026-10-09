import { Global, Module } from "@nestjs/common";
import { DebuggerService } from "./debugger.service";
// import { LoggerModule } from '../logger/logger.module';

@Global()
@Module({
  imports: [],
  providers: [DebuggerService],
  exports: [DebuggerService],
})
export class DebuggerModule {}
