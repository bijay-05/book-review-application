import { FileCreateDto } from "../dtos/book.dto";

export interface ICreateBook {
  title: string;
  description: string;
  authors: string[];
  images: FileCreateDto[];
  userId: number;
}
