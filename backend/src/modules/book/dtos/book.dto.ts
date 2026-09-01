import {
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
} from "class-validator";
import { ICreateBook } from "../interfaces/book.interface";
import { ApiProperty } from "@nestjs/swagger";

export class FileCreateDto {
  // bookId: number;
  @ApiProperty({
    name: "name",
    type: "string",
    required: true,
    example: "random.jpg",
  })
  name: string;
}

export class BookCreateDto implements ICreateBook {
  @ApiProperty({
    name: "title",
    type: "string",
    required: true,
    example: "Random Book Title",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: "description",
    type: "string",
    required: true,
    example: "Random Book Description",
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: "authors",
    type: "array",
    required: true,
    example: ["john mayer", "heath ledger"],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  authors: string[];

  @ApiProperty({
    name: "images",
    type: "array",
    required: true,
    example: [{ name: "book-picture.jpeg" }],
  })
  @IsArray()
  @IsNotEmpty()
  images: FileCreateDto[];

  userId: number;
}
