import {
  CreateBookParams,
  ICreateBooksRepository,
} from "@/application/interfaces/IcreateBooks";
import { HttpRequest, HttpResponse, IController } from "./protocols";
import { Book } from "@/domain/entities/Book";
import { badRequest, createdRequest, serverError } from "./helpers";
import { CreateBookSchema } from "@/application/services/createBookSchema";

export class CreateBookController implements IController {
  constructor(private readonly createBookRepository: ICreateBooksRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateBookParams>,
  ): Promise<HttpResponse<Book | string>> {
    try {
      const validationBook = CreateBookSchema.safeParse(httpRequest.body);

      if (!validationBook.success) {
        const errorMessage = validationBook.error.errors
          .map((error) => {
            const fieldName = error.path[0];
            return `Field ${fieldName} is ${error.message}`;
          })
          .join(", ");

        return badRequest(errorMessage);
      }

      const book = await this.createBookRepository.createBook(
        validationBook.data,
      );

      return createdRequest<Book>(book);
    } catch (error) {
      return serverError();
    }
  }
}
