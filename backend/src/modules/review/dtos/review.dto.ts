import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { ICreateReview } from "../interfaces/review.interface";

export class ReviewCreateDto implements ICreateReview {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsPositive()
  @IsNotEmpty()
  bookId: number;

  userId: number;
}
