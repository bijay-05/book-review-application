import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  SerializeOptions,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDto } from "./dtos/user.dto";
import { User } from "prisma/prisma/client";
import { IResponse } from "src/common/response/interfaces/response.interface";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";
import {
  GetUser,
  UserProtected,
} from "src/common/auth/decorators/auth.decorator";
import { IAuthUser } from "src/common/auth/interfaces/jwt.interface";
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage("User created successfully")
  @ApiOperation({
    summary: "Crete new User",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User created successfully",
  })
  async create(
    @Body() createDto: UserCreateDto,
  ): Promise<IResponse<Partial<User>>> {
    const user = await this.userService.create(createDto);

    return {
      data: user,
    };
  }

  @Get()
  @UserProtected()
  @ApiBearerAuth("accessToken")
  @ResponseMessage("User retrieved successfully")
  @ApiOperation({
    summary: "Get user details",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User retrieved successfully",
  })
  async getById(
    @GetUser() authUser: IAuthUser,
  ): Promise<IResponse<Partial<User>>> {
    const user = await this.userService.getById(Number(authUser.id));
    return {
      data: user,
    };
  }
}
