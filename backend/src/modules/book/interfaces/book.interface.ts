import { FileCreateDto } from "../dtos/book.dto";
import { Book } from "prisma/prisma/client";

export interface ICreateBook {
  title: string;
  description: string;
  authors: string[];
  images: FileCreateDto[];
  userId: number;
}
export interface IImageFile {
  name: string;
}

export interface IUserForBookList {
  name: string;
}

export interface IBookList extends Omit<Book, "userId"> {
  images: IImageFile[];
  user: IUserForBookList;
}

export interface IUserBookList extends Omit<Book, "userId"> {
  images: IImageFile[];
}
