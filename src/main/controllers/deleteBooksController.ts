import { Book } from "@prisma/client";
import { IDeleteBooksRepository } from "@/application/interfaces/IdeleteBooks";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "../config/helpers/protocols";
import {
  badRequest,
  niceRequest,
  serverError,
} from "../config/helpers/helpers";

export class DeleteBookController implements IController {
  constructor(private readonly deleteBooksRepository: IDeleteBooksRepository) {}
  async handle(): Promise<HttpResponse<Book[] | string>> {
    try {
      const booksData = await this.deleteBooksRepository.deleteBooks();
      return niceRequest<Book[]>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}

export class DeleteBooksByIdController implements IController {
  constructor(private readonly deleteBooksRepository: IDeleteBooksRepository) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Book | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const booksData = await this.deleteBooksRepository.deleteBooksById(id);
      return niceRequest<Book>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}
