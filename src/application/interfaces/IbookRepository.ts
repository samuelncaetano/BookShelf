import { BookModel } from "@/domain/entities/bookModel";

export interface IBookRepository {
  createBook(book: BookModel): Promise<BookModel>;
  findBookById(bookId: string): Promise<BookModel | null>;
  findAllBook(): Promise<BookModel[]>;
  updateBook(): Promise<BookModel>;
  deleteBook(): Promise<void>;
}
