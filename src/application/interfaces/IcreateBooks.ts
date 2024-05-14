import { Book } from "@/domain/entities/Book";
import { Status as PrismaStatus } from "@prisma/client";

export interface CreateBookParams {
  title: string;
  author: string;
  volume?: number | null;
  status?: PrismaStatus | null;
}

export interface ICreateBooksRepository {
  createBook(params: CreateBookParams): Promise<Book>;
  createManyBooks(params: CreateBookParams[]): Promise<Book[]>;
}
