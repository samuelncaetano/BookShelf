import { IcreateBook } from "@/application/interfaces/IcreateBook";
import { BookModel } from "@/domain/entities/bookModel";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaBookRepository implements IcreateBook {
  async createBook(book: BookModel): Promise<Omit<BookModel, "id">> {
    const bookDataWithoutId = {
      title: book.title,
      author: book.author,
      volume: book.volume,
      status: book.status,
    };

    const created = await prisma.book.create({
      data: bookDataWithoutId,
    });

    return {
      title: created.title,
      author: created.author,
      volume: created.volume,
      status: created.status,
    };
  }
}
