import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { UserController } from "src/modules/user/user.controller";
import { BookModule } from "src/modules/book/book.module";
import { BookController } from "src/modules/book/book.controller";
import { ReviewModule } from "src/modules/review/review.module";
import { ReviewController } from "src/modules/review/review.controller";
import { AuthenticationModule } from "src/modules/auth/auth.module";
import { AuthenticationController } from "src/modules/auth/auth.controller";

@Module({
  imports: [AuthenticationModule, BookModule, ReviewModule, UserModule],
  controllers: [
    AuthenticationController,
    BookController,
    ReviewController,
    UserController,
  ],
})
export class ApiRouteModule {}
