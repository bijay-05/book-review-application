import { Injectable, Inject } from "@nestjs/common";
import pino from "pino";
import { LOGGER_CLIENT_CONNECTION } from "../logger/logger.constant";
import { ENUM_APP_ENVIRONMENT } from "../constants/app.constant";

@Injectable()
export class DebuggerService {
  env: string;
  constructor(
    @Inject(LOGGER_CLIENT_CONNECTION)
    private readonly loggerService: pino.Logger,
  ) {
    this.env = process.env.APP_MODE || ENUM_APP_ENVIRONMENT.DEVELOPMENT;
  }

  log(...data: any[]) {
    if (this.env !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
      console.log(...data);
    }
  }

  info(data: any) {
    console.log("🚀 ~ DebuggerService ~ info ~ data:", data);
    this.loggerService.info(data);
  }

  warn(data: any) {
    console.log("🚀 ~ DebuggerService ~ warn ~ data:", data);
    this.loggerService.warn(data);
  }

  error(error: any | Error) {
    this.loggerService.error(error);
  }
}
