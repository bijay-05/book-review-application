import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { PrismaModule } from "src/common/prisma/prisma";
import { ReviewService } from "./review.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
