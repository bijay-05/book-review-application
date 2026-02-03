import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  SerializeOptions,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDto } from "./dtos/user.dto";
import { User } from "prisma/prisma/client";
import { IResponse } from "src/common/response/interfaces/response.interface";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage("User created successfully")
  async create(
    @Body() createDto: UserCreateDto,
  ): Promise<IResponse<Partial<User>>> {
    const user = await this.userService.create(createDto);

    return {
      data: user,
    };
  }

  @Get(":id")
  @ResponseMessage("User retrieved successfully")
  async getById(@Param() id: number): Promise<IResponse<Partial<User>>> {
    const user = await this.userService.getById(id);
    return {
      data: user,
    };
  }
}
