import {
  CreateBookParams,
  ICreateBookRepository,
} from "@/application/interfaces/IcreateBook";
import { PrismaClient } from "@prisma/client";
import { Book } from "@/domain/entities/Book";

const prisma = new PrismaClient();

export class PrismaCreateBooks implements ICreateBookRepository {
  async createBook(params: CreateBookParams): Promise<Book> {
    const status = params.status || "NOT_STARTED";

    const createdBook = await prisma.book.create({
      data: {
        title: params.title,
        author: params.author,
        volume: params.volume,
        status: status,
      },
    });

    if (!createdBook) {
      throw new Error("Book not created");
    }

    return createdBook;
  }
}
