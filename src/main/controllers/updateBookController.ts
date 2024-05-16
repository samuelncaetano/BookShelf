import { Book } from "@/domain/entities/Book";
import { CreateBookSchema } from "@/application/services/createBookSchema";
import {
  IUpdateBooksRepository,
  UpdateBookParams,
} from "@/application/interfaces/IupdateBooks";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "../config/helpers/protocols";
import {
  badRequest,
  createdRequest,
  serverError,
} from "../config/helpers/helpers";

export class UpdateBookController implements IController {
  constructor(private readonly updateBooksRepository: IUpdateBooksRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateBookParams>,
  ): Promise<HttpResponse<Omit<Book, "id"> | string>> {
    try {
      const id = httpRequest?.params?.id;
      const validationBook = CreateBookSchema.safeParse(httpRequest.body);

      if (!id) {
        return badRequest("Missing user id");
      }

      if (!validationBook.success) {
        const errorMessage = validationBook.error.errors
          .map((error) => {
            const fieldName = error.path[0];
            return `Field ${fieldName} is ${error.message}`;
          })
          .join(", ");

        return badRequest(errorMessage);
      }

      const validatedData = validationBook.data;

      const books = await this.updateBooksRepository.updateBook(
        id,
        validatedData,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...bookWithoutId } = books;

      return createdRequest<Omit<Book, "id">>(bookWithoutId);
    } catch (error) {
      return serverError();
    }
  }
}
