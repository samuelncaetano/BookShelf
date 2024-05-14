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
import { Status as PrismaStatus } from "@prisma/client";
// domain/entities/InMemoryBook.ts
export interface InMemoryBook {
  id: string;
  title: string;
  author: string;
  volume: number | null;
  status: PrismaStatus;
}

// application/interfaces/InMemoryDeleteBook.ts
export interface InMemoryDeleteBooksRepository {
  deleteBooks(): Promise<InMemoryBook[]>;
  deleteBooksById(id: string): Promise<InMemoryBook | null>;
}

// infrastructure/database/InMemoryDeleteBooks.ts
export class InMemoryDeleteBooks implements InMemoryDeleteBooksRepository {
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

  deleteBooksById(id: string): Promise<InMemoryBook | null> {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      const deletedBook = this.books.splice(index, 1)[0];
      return Promise.resolve(deletedBook);
    } else {
      return Promise.resolve(null);
    }
  }

  deleteBooks(): Promise<InMemoryBook[]> {
    this.books = [];
    return Promise.resolve(this.books);
  }

  getBooks(): InMemoryBook[] {
    return this.books;
  }
}
// main/controllers/InMemoryDeleteBookController.ts
export class InMemoryDeleteBookController implements IController {
  constructor(private readonly inMemoryDeleteBooks: InMemoryDeleteBooks) {}
  async handle(): Promise<HttpResponse<InMemoryBook[] | string>> {
    try {
      const booksData = await this.inMemoryDeleteBooks.deleteBooks();
      return niceRequest<InMemoryBook[]>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}

// main/controllers/InMemoryDeleteBooksByIdController.ts
export class InMemoryDeleteBooksByIdController implements IController {
  constructor(private readonly inMemoryDeleteBooks: InMemoryDeleteBooks) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<InMemoryBook | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }
      const booksData = await this.inMemoryDeleteBooks.deleteBooksById(id);

      return niceRequest<InMemoryBook>(booksData);
    } catch (error) {
      return serverError();
    }
  }
}
