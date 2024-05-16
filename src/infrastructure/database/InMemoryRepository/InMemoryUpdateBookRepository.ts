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
  id: string;
  title: string;
  author: string;
  volume: number | null;
  status: PrismaStatus;
}

// application/interfaces/InMemoryUpdateBook.ts
export interface InMemoryUpdateBookParams {
  title?: string;
  author?: string;
  volume?: number | null;
  status?: PrismaStatus | null;
}

export interface InMemoryUpdateBooksRepository {
  updateBook(
    id: string,
    params: InMemoryUpdateBookParams,
  ): Promise<InMemoryBook>;
}

// infrastructure/database/InMemoryUpdateBooks.ts
export class InMemoryUpdateBook implements InMemoryUpdateBooksRepository {
  private books: InMemoryBook[] = [
    {
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    },
    {
      id: "2025",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    },
  ];

  updateBook(
    id: string,
    params: InMemoryUpdateBookParams,
  ): Promise<InMemoryBook> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    const updateBook: InMemoryBook = {
      ...this.books[bookIndex],
      title: params.title || this.books[bookIndex].title,
      author: params.author || this.books[bookIndex].author,
      volume: params.volume ?? null ?? 0,
      status: params.status ?? "NOT_STARTED",
    };

    this.books[bookIndex] = updateBook;

    return Promise.resolve(updateBook);
  }
  getBooks(): InMemoryBook[] {
    return this.books;
  }
}

// main/controllers/InMemoryUpdateBookController.ts
export class InMemoryUpdateBookController implements IController {
  constructor(private readonly inMemoryUpdateBook: InMemoryUpdateBook) {}
  async handle(
    httpRequest: HttpRequest<InMemoryUpdateBookParams>,
  ): Promise<HttpResponse<Omit<InMemoryBook, "id"> | string>> {
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

      const books = await this.inMemoryUpdateBook.updateBook(id, validatedData);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...bookWithoutId } = books;

      return createdRequest<Omit<InMemoryBook, "id">>(bookWithoutId);
    } catch (error) {
      return serverError();
    }
  }
}
