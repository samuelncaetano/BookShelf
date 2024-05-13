import { Status as PrismaStatus } from "@prisma/client";
import {
  badRequest,
  niceRequest,
  serverError,
} from "@/main/config/helpers/helpers";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocols";

// domain/entities/InMemoryBook.ts
export interface InMemoryBook {
  id: string;
  title: string;
  author: string;
  volume: number | null;
  status: PrismaStatus;
}

// application/interfaces/InMemoryGetBook.ts
export interface InMemorygetBooksRepository {
  getBooks(): Promise<InMemoryBook[]>;
  getBooksById(id: string): Promise<InMemoryBook | null>;
}

// infrastructure/database/InMemoryGetBooks.ts
export class InMemoryGetBooks implements InMemorygetBooksRepository {
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

  getBooks(): Promise<InMemoryBook[]> {
    return Promise.resolve(this.books);
  }
  getBooksById(id: string): Promise<InMemoryBook | null> {
    const book = this.books.find((book) => book.id === id);
    return Promise.resolve(book || null);
  }
}

// main/controllers/InMemoryGetBookController.ts
export class InMemoryGetBookController implements IController {
  constructor(private readonly inMemoryGetBooks: InMemoryGetBooks) {}
  async handle(): Promise<HttpResponse<InMemoryBook[] | string>> {
    try {
      const booksData = await this.inMemoryGetBooks.getBooks();
      return niceRequest<InMemoryBook[]>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}

export class InMemoryGetBooksByIdController implements IController {
  constructor(private readonly inMemoryGetBooks: InMemoryGetBooks) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<InMemoryBook | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const booksData = await this.inMemoryGetBooks.getBooksById(id);

      return niceRequest<InMemoryBook>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}
