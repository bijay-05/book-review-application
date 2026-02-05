import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
