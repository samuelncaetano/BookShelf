import { Status as PrismaStatus } from "@prisma/client";
import { niceRequest, serverError } from "@/main/config/helpers/helpers";
import { HttpResponse, IController } from "@/main/config/helpers/protocols";

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
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    },
  ];

  getBooks(): Promise<InMemoryBook[]> {
    return Promise.resolve(this.books);
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
