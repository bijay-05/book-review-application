import { User } from "prisma/prisma/client";

export interface ICreateReview {
  value: string;
  bookId: number;
  userId: number;
}
