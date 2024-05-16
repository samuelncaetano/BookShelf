import { Book } from "@/domain/entities/Book";
import { Status as PrismaStatus } from "@prisma/client";

export interface UpdateBookParams {
  title?: string;
  author?: string;
  volume?: number | null;
  status?: PrismaStatus | null;
}

export interface IUpdateBooksRepository {
  updateBook(id: string, params: UpdateBookParams): Promise<Book>;
}
