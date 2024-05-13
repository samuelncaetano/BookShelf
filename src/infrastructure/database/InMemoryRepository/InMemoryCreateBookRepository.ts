import { CreateBookSchema } from "@/application/services/createBookSchema";
import {
  badRequest,
  createdRequest,
  serverError,
} from "@/main/config/helpers/helpers";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocols";
import { Status as PrismaStatus } from "@prisma/client";

// domain/entities/InMemoryBook.ts
export interface InMemoryBook {
  title: string | null;
  author: string | null;
  volume: number | null;
  status: PrismaStatus | null;
}

// application/interfaces/InMemoryCreateBook.ts
export interface InMemoryCreateBookParams {
  title?: string | null;
  author?: string | null;
  volume?: number | null;
  status?: PrismaStatus | null;
}

export interface InMemoryCreateBookRepository {
  createBook(params: InMemoryCreateBookParams): Promise<InMemoryBook>;
}

// infrastructure/database/InMemoryCreateBooks.ts
export class InMemoryCreateBooks implements InMemoryCreateBookRepository {
  private books: InMemoryBook[] = [];

  createBook(params: InMemoryCreateBookParams): Promise<InMemoryBook> {
    return new Promise<InMemoryBook>((resolve) => {
      const status = params.status || "NOT_STARTED";
      const book: InMemoryBook = {
        title: params.title || null,
        author: params.author || null,
        volume: params.volume || null,
        status: status,
      };

      this.books.push(book);
      resolve(book);
    });
  }
}

// main/controllers/InMemoryCreateBookController.ts
export class InMemoryCreateBookController implements IController {
  constructor(private readonly inMemoryCreateBooks: InMemoryCreateBooks) {}

  async handle(
    httpRequest: HttpRequest<InMemoryCreateBookParams>,
  ): Promise<HttpResponse<InMemoryBook | string>> {
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

      const validatedData = validationBook.data;

      const book = await this.inMemoryCreateBooks.createBook(validatedData);
      return createdRequest<InMemoryBook>(book);
    } catch (error) {
      return serverError();
    }
  }
}
