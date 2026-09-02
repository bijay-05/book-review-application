import { Module } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { MailProcessor } from "./processors/mail-processor";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MailerService, MailProcessor],
  exports: [MailerService, MailProcessor],
})
export class MailModule {}
