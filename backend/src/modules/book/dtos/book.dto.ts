import {
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
} from "class-validator";
import { ICreateBook } from "../interfaces/book.interface";

export class FileCreateDto {
  bookId: number;
  name: string;
}

export class BookCreateDto implements ICreateBook {
  @IsAlphanumeric()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray({ each: true })
  @IsNotEmpty()
  authors: string[];

  @IsArray({ each: true })
  @IsNotEmpty()
  images: FileCreateDto[];

  userId: number;
}
