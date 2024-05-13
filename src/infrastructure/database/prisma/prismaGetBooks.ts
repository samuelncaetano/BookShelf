import { Book } from "@/domain/entities/Book";
import { PrismaClient } from "@prisma/client";
import { IgetBooksRepository } from "@/application/interfaces/IgetBooks";

const prisma = new PrismaClient();

export class PrismaGetBooks implements IgetBooksRepository {
  async getBooks(): Promise<Book[]> {
    const getBooks = await prisma.book.findMany({});
    return getBooks;
  }
}
