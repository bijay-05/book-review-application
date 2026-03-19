import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port: number = configService.get<number>("app.http.port", 3000);
  const host: string = configService.get<string>("app.http.host", "localhost");
  app.enableShutdownHooks();
  await app.listen(port, host);
}
bootstrap();
