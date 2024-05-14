import { Book } from "@/domain/entities/Book";
export interface IDeleteBooksRepository {
  deleteBooks(): Promise<Book[] | null>;
  deleteBooksById(id: string): Promise<Book | null>;
}
