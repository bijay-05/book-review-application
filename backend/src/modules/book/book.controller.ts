import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { BookService } from "./book.service";
import {
  IResponse,
  IResponsePaging,
} from "src/common/response/interfaces/response.interface";
import { ResponseMessage } from "src/common/response/decorators/responseMessage.decorator";
import { Book } from "prisma/prisma/client";
import { BookCreateDto } from "./dtos/book.dto";
import { IBookList, IUserBookList } from "./interfaces/book.interface";
import {
  GetUser,
  UserProtected,
} from "src/common/auth/decorators/auth.decorator";
import { IAuthUser } from "src/common/auth/interfaces/jwt.interface";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UserProtected()
  @ResponseMessage("Book created successfully")
  async create(@Body() createDto: BookCreateDto): Promise<IResponse<Book>> {
    createDto.userId = 1;

    const data = await this.bookService.create(createDto);

    return {
      data,
    };
  }

  @Get()
  @ResponseMessage("Book list retrieved successfully")
  async getAll(): Promise<IResponsePaging<IBookList>> {
    const data = await this.bookService.getAll();

    return {
      data: data,
      _pagination: {
        totalPage: 2,
        total: 10,
        limit: 2,
        page: 2,
      },
    };
  }

  @Get("user")
  @UserProtected()
  @ResponseMessage("Book list retrieved successfully")
  async getByUser(
    @GetUser() authUser: IAuthUser,
  ): Promise<IResponsePaging<IUserBookList>> {
    const data = await this.bookService.getByUserId(Number(authUser.id));

    return {
      data,
      _pagination: {
        total: 10,
        limit: 10,
        page: 1,
        totalPage: 2,
      },
    };
  }

  @Get(":id")
  @UserProtected()
  @ResponseMessage("Book retrieved successfully")
  async getDetailed(
    @Param("id") id: number,
  ): Promise<IResponse<Partial<Book>>> {
    const data = await this.bookService.getById(Number(id));

    return {
      data,
    };
  }
}
