import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { BookModule } from "./modules/book/book.module";
import { ReviewModule } from "./modules/review/review.module";
import { AuthenticationModule } from "./modules/auth/auth.module";
import { CommonModule } from "./common/common.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    UserModule,
    BookModule,
    ReviewModule,
    AuthenticationModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
