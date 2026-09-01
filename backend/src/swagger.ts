import { NestApplication } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApiRouteModule } from "./routes/routes";
import { ENUM_APP_ENVIRONMENT } from "./common/constants/app.constant";

export async function swaggerInit(app: NestApplication) {
  const environment = process.env["APP_ENV"];

  if (environment == ENUM_APP_ENVIRONMENT.DEVELOPMENT) {
    const apiRouterDocumentBuild = new DocumentBuilder()
      .setTitle("Book Review API Documentation")
      .setDescription(
        "This is the API documentation for the Book Review Backend.",
      )
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const apiRouterDocument = SwaggerModule.createDocument(
      app,
      apiRouterDocumentBuild,
      {
        deepScanRoutes: true,
        include: [ApiRouteModule],
      },
    );

    SwaggerModule.setup("book-review/api-docs", app, apiRouterDocument, {
      customSiteTitle: "Book Review App Backend ",
      swaggerOptions: {
        tagsSorter: (a: string, b: string) => {
          if (a === "Authentication") return -100;
          if (b === "Authentication") return 100;

          return a > b ? 1 : -1;
        },
        docExpansion: false,
        persistAuthorization: true,
        filter: true,
        displayRequestDuration: true,
      },
    });
  }
}
