import { Module } from "@nestjs/common";
import { RouterModule as NestRouterModule } from "@nestjs/core";
import { ApiRouteModule } from "./routes";

@Module({
  imports: [
    ApiRouteModule,
    NestRouterModule.register([
      {
        path: "api/v1",
        module: ApiRouteModule,
      },
    ]),
  ],
})
export class AppRouterModule {}
