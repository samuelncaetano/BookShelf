import { IDeleteBooksRepository } from "@/application/interfaces/IdeleteBooks";
import { Book } from "@/domain/entities/Book";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaDeleteBooks implements IDeleteBooksRepository {
  async deleteBooks(): Promise<Book[] | null> {
    const deleteBooks = await prisma.book.findMany();
    await prisma.book.deleteMany({});
    return deleteBooks;
  }

  async deleteBooksById(id: string): Promise<Book | null> {
    const deleteBooks = await prisma.book.delete({
      where: {
        id: id,
      },
    });
    return deleteBooks;
  }
}
