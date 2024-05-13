import { Book } from "@/domain/entities/Book";
import { IgetBooksRepository } from "@/application/interfaces/IgetBooks";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocols";
import {
  badRequest,
  niceRequest,
  serverError,
} from "../config/helpers/helpers";

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

export class GetBooksByIdController implements IController {
  constructor(private getBooksRepository: IgetBooksRepository) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Book | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }
      const booksData = await this.getBooksRepository.getBooksById(id);

      return niceRequest<Book>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}
