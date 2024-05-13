import { Book } from "@/domain/entities/Book";
import { IgetBooksRepository } from "@/application/interfaces/IgetBooks";
import { HttpResponse, IController } from "@/main/config/helpers/protocols";
import { niceRequest, serverError } from "../config/helpers/helpers";

export class GetBooksController implements IController {
  constructor(private getBooksRepository: IgetBooksRepository) {}
  async handle(): Promise<HttpResponse<Book[] | string>> {
    try {
      const booksData = await this.getBooksRepository.getBooks();
      return niceRequest<Book[]>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}
