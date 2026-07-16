import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return {
      data: "Application Running Successfully",
    };
  }

  @Get("category")
  getCategory() {
    return {
      data: [
        { value: "science-fiction", id: 1, name: "Science Fiction" },
        { value: "history", id: 2, name: "History" },
        { value: "comic", id: 3, name: "Comic" },
      ],
    };
  }
}
