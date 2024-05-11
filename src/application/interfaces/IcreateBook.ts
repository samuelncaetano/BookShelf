import { BookModel } from "@/domain/entities/bookModel";

export interface IcreateBook {
  createBook(book: BookModel): Promise<Omit<BookModel, "id">>;
}
