import { Module } from "@nestjs/common";
import { AppRouterModule } from "./routes/router.module";
import { CommonModule } from "./common/common.module";
import { AppController } from "./app.controller";

@Module({
  imports: [CommonModule, AppRouterModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
