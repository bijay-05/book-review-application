import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { ICreateReview } from "../interfaces/review.interface";
import { ApiProperty } from "@nestjs/swagger";

export class ReviewCreateDto implements ICreateReview {
  @ApiProperty({
    name: "value",
    type: "string",
    required: true,
    example: "This book is grear for the ",
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    name: "bookId",
    type: "number",
    required: true,
    example: 223,
  })
  @IsPositive()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    name: "rating",
    type: "number",
    required: true,
    example: 4,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  userId: number;
}
