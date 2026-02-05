import { PRISMA_CLIENT } from "src/common/prisma/prisma.constant";
import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "prisma/prisma/internal/class";
import {
  IBookList,
  ICreateBook,
  IUserBookList,
} from "./interfaces/book.interface";
import { Book, File } from "prisma/prisma/client";

@Injectable()
export class BookService {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prismaClient: PrismaClient,
  ) {}

  async create(createDto: ICreateBook): Promise<Book> {
    const createdBook = await this.prismaClient.book.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        authors: createDto.authors,
        userId: createDto.userId,
        images: {
          createMany: {
            data: createDto.images,
          },
        },
      },
    });

    return createdBook;
  }

  async getAll(): Promise<IBookList[]> {
    const books = await this.prismaClient.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        authors: true,
        createdAt: true,
        images: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (books.length < 1) {
      throw new NotFoundException("Books not found");
    }

    return books;
  }

  async getById(id: number): Promise<Partial<Book>> {
    const book = await this.prismaClient.book.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        description: true,
        authors: true,
        images: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
            value: true,
            createdAt: true,
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    return book;
  }

  async getByUserId(userId: number): Promise<IUserBookList[]> {
    const books = await this.prismaClient.book.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        authors: true,
        createdAt: true,
        images: {
          select: {
            name: true,
          },
        },
      },
    });

    if (books.length < 1) {
      throw new BadRequestException("Books not found");
    }

    return books;
  }
}
