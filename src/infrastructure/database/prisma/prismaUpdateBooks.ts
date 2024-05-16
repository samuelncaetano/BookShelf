import {
  IUpdateBooksRepository,
  UpdateBookParams,
} from "@/application/interfaces/IupdateBooks";
import { Book } from "@/domain/entities/Book";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUpdateBooks implements IUpdateBooksRepository {
  async updateBook(id: string, params: UpdateBookParams): Promise<Book> {
    const updateBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        title: params.title,
        author: params.author,
        volume: params.volume,
        status: params.status,
      },
    });
    if (!updateBook) {
      throw new Error("Book not updated");
    }
    return updateBook;
  }
}
