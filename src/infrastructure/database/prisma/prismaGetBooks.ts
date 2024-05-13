import { Book } from "@/domain/entities/Book";
import { PrismaClient } from "@prisma/client";
import { IgetBooksRepository } from "@/application/interfaces/IgetBooks";

const prisma = new PrismaClient();

export class PrismaGetBooks implements IgetBooksRepository {
  async getBooks(): Promise<Book[]> {
    const getBooks = await prisma.book.findMany({});
    return getBooks;
  }
  async getBooksById(id: string): Promise<Book | null> {
    const getBooksById = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });
    return getBooksById;
  }
}
