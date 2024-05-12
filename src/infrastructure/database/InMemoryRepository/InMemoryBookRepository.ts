import { createdRequest, serverError } from "@/main/controllers/helpers";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/controllers/protocols";
import { Status as PrismaStatus } from "@prisma/client";

// domain/entities/InMemoryBook.ts
export interface InMemoryBook {
  title: string;
  author: string;
  volume: string | null;
  status: PrismaStatus | null;
}

// application/interfaces/InMemoryCreateBook.ts
export interface InMemoryCreateBookParams {
  title: string;
  author: string;
  volume?: string | null;
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
      const volume = params.volume || "0";
      const status = params.status || "NOT_STARTED";
      const book: InMemoryBook = {
        title: params.title,
        author: params.author,
        volume: volume || null,
        status: status || null,
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
      const book = await this.inMemoryCreateBooks.createBook(httpRequest.body!);
      return createdRequest<InMemoryBook>(book);
    } catch (error) {
      return serverError();
    }
  }
}
