import { User } from "prisma/prisma/client";

export interface ICreateReview {
  value: string;
  bookId: number;
  userId: number;
  rating?: number;
}

interface IBookTitle {
  title: string;
}

export interface IReviewByUserList {
  id: number;
  value: string;
  createdAt: Date;
  book: IBookTitle;
  rating: number;
}
