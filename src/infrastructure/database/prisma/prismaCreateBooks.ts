import {
  CreateBookParams,
  ICreateBooksRepository,
} from "@/application/interfaces/IcreateBooks";
import { PrismaClient } from "@prisma/client";
import { Book } from "@/domain/entities/Book";

const prisma = new PrismaClient();

export class PrismaCreateBooks implements ICreateBooksRepository {
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

  async createManyBooks(params: CreateBookParams[]): Promise<Book[]> {
    const booksToCreate = params.map((params) => {
      const status = params.status || "NOT_STARTED";
      return {
        title: params.title,
        author: params.author,
        volume: params.volume,
        status: status,
      };
    });

    await prisma.book.createMany({
      data: booksToCreate,
    });

    const createdBooks = await prisma.book.findMany({
      where: {
        OR: booksToCreate.map((book) => ({
          title: book.title,
          author: book.author,
        })),
      },
    });

    return createdBooks;
  }
}
