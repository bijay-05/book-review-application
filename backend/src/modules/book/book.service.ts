import { PRISMA_CLIENT } from "src/common/prisma/prisma.constant";
import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "prisma/prisma/internal/class";
import { ICreateBook } from "./interfaces/book.interface";
import { Book, File } from "prisma/prisma/client";

@Injectable()
export class BookService {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prismaClient: PrismaClient,
  ) {}

  async create(createDto: ICreateBook): Promise<Book> {
    const existingUser = await this.prismaClient.user.findFirst({
      where: {
        id: createDto.userId,
      },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    const createdBook = await this.prismaClient.book.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        authors: createDto.authors,
        userId: existingUser.id,
        images: {
          createMany: {
            data: createDto.images,
          },
        },
      },
    });

    return createdBook;
  }

  async getAll(): Promise<Partial<Book>[]> {
    const books = await this.prismaClient.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        authors: true,
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
}
