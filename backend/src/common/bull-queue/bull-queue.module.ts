import { BullModule } from "@nestjs/bull";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from "src/common/redis/redis.module";

import { MAIL_JOB } from "./mail-queue/constants/mail-queue.constant";
import { MailQueueService } from "./mail-queue/mail-queue.service";

@Global()
@Module({
  providers: [MailQueueService],
  exports: [MailQueueService],
  imports: [
    ConfigModule,
    RedisModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>("helper.redis.host"),
          port: configService.get<number>("helper.redis.port"),
          password: configService.get<string>("helper.redis.password"),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: MAIL_JOB,
    }),
  ],
})
export class BullQueueModule {}
