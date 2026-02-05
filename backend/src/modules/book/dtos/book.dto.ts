import {
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
} from "class-validator";
import { ICreateBook } from "../interfaces/book.interface";

export class FileCreateDto {
  // bookId: number;
  name: string;
}

export class BookCreateDto implements ICreateBook {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  authors: string[];

  @IsArray()
  @IsNotEmpty()
  images: FileCreateDto[];

  userId: number;
}
