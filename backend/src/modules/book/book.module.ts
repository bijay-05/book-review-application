import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma";
import { BookService } from "./book.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
