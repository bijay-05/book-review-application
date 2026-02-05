import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient, Review } from "prisma/prisma/client";
import { PRISMA_CLIENT } from "src/common/prisma/prisma.constant";
import { ICreateBook } from "../book/interfaces/book.interface";
import { ICreateReview } from "./interfaces/review.interface";

@Injectable()
export class ReviewService {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prismaClient: PrismaClient,
  ) {}

  async create(createDto: ICreateReview): Promise<Review> {
    await this.checkExistingBook(createDto.bookId);

    const createdData = await this.prismaClient.review.create({
      data: {
        value: createDto.value,
        userId: createDto.userId,
        bookId: createDto.bookId,
      },
    });

    return createdData;
  }

  async getReviewListByUser(userId: number): Promise<Review[]> {
    const data = await this.prismaClient.review.findMany({
      where: {
        userId: userId,
      },
    });

    if (data.length < 1) {
      throw new NotFoundException("Review not found");
    }

    return data;
  }

  async checkExistingBook(id: number): Promise<void> {
    const book = await this.prismaClient.book.findFirst({
      where: {
        id: id,
      },
    });

    if (!book) {
      throw new NotFoundException("Book not found");
    }
  }
}
