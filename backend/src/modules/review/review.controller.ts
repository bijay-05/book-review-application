import { Controller, Get, Post, Body, HttpStatus } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewCreateDto } from "./dtos/review.dto";
import {
  IResponse,
  IResponsePaging,
} from "src/common/response/interfaces/response.interface";
import { Review } from "prisma/prisma/client";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";
import { IAuthUser } from "src/common/auth/interfaces/jwt.interface";
import {
  GetUser,
  UserProtected,
} from "src/common/auth/decorators/auth.decorator";
import { IReviewByUserList } from "./interfaces/review.interface";
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Review")
@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UserProtected()
  @ApiBearerAuth("accessToken")
  @ResponseMessage("Review created successfully")
  @ApiOperation({
    summary: "Create review",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Review created successfully",
  })
  async create(
    @Body() createDto: ReviewCreateDto,
    @GetUser() authUser: IAuthUser,
  ): Promise<IResponse<Review>> {
    createDto.userId = Number(authUser.id);
    const data = await this.reviewService.create(createDto);

    return {
      data,
    };
  }

  @Get("/user")
  @UserProtected()
  @ApiBearerAuth("accessToken")
  @ResponseMessage("Review list retrieved successfully")
  @ApiOperation({
    summary: "Get review list by user",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Review list retrieved successfully",
  })
  async getReviewByUser(
    @GetUser() authUser: IAuthUser,
  ): Promise<IResponsePaging<IReviewByUserList>> {
    const data = await this.reviewService.getReviewListByUser(
      Number(authUser.id),
    );

    return {
      data,
      _pagination: {
        total: 10,
        page: 2,
        limit: 10,
        totalPage: 100,
      },
    };
  }
}
