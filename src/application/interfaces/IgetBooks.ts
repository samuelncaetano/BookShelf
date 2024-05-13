import { Book } from "@/domain/entities/Book";
export interface IgetBooksRepository {
  getBooks(): Promise<Book[]>;
}
