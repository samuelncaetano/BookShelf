import {
  CreateBookParams,
  ICreateBookRepository,
} from "@/application/interfaces/IcreateBook";
import { HttpRequest, HttpResponse, IController } from "./protocols";
import { Book } from "@/domain/entities/Book";
import { createdRequest, serverError } from "./helpers";

export class createBookController implements IController {
  constructor(private readonly createBookRepository: ICreateBookRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateBookParams>,
  ): Promise<HttpResponse<Book | string>> {
    try {
      const book = await this.createBookRepository.createBook(
        httpRequest.body!,
      );
      return createdRequest<Book>(book);
    } catch (error) {
      return serverError();
    }
  }
}
