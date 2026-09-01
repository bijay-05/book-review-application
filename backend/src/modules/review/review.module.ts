import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma";
import { ReviewService } from "./review.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
