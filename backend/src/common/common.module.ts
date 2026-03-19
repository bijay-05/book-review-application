import { Module } from "@nestjs/common";
import { ResponseModule } from "./response/response.module";
import { PrismaModule } from "./prisma/prisma";
import { ErrorModule } from "./error/error.module";
import { LoggerModule } from "./logger/logger.module";
import { DebuggerModule } from "./debugger/debugger.module";
import { AuthModule } from "./auth/auth.module";
import { RequestModule } from "./request/request.module";
import { MetricsModule } from "./metrics/metrics.module";
import Joi from "joi";
import configs from "./configs";
import { ConfigModule } from "@nestjs/config";
import { ENUM_APP_ENVIRONMENT } from "./constants/app.constant";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: [".env"],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default(ENUM_APP_ENVIRONMENT.DEVELOPMENT)
          .required(),
        APP_EMAIL: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        MAX_REQUEST_HIT: Joi.number().required(),
        MAX_REQUEST_HIT_EXPIRATION_TIME_IN_MILLI_SECONDS:
          Joi.number().required(),
        PASSWORD_MAX_REQUEST_LIMIT: Joi.number().required(),
        HTTP_HOST: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        EMAIL_VERIFICATION_TOKEN_EXPIRED_IN_SECONDS: Joi.string().required(),
        EMAIL_VERIFICATION_TOKEN_SECRET_KEY: Joi.string().required(),
        FRONT_END_BASE_URL: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    AuthModule,
    ErrorModule,
    LoggerModule,
    DebuggerModule,
    PrismaModule,
    ResponseModule,
    RequestModule,
    MetricsModule,
  ],
})
export class CommonModule {}
