import { describe, it, expect } from "vitest";
import {
  InMemoryCreateBooks,
  InMemoryCreateBookParams,
  InMemoryCreateBookController,
} from "@/infrastructure/database/InMemoryRepository/InMemoryBookRepository";

import { HttpRequest } from "@/main/controllers/protocols";

// infrastructure/database/InMemoryCreateBooks.ts
describe("InMemoryCreateBooks", () => {
  it("Must create a book in memory", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const bookParams: InMemoryCreateBookParams = {
      title: "1984",
      author: "George Orwell",
      volume: "1",
      status: "STARTED",
    };

    // Act
    const createdBook = await inMemoryCreateBooks.createBook(bookParams);

    // Assert
    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe("1984");
    expect(createdBook.author).toBe("George Orwell");
    expect(createdBook.volume).toBe("1");
    expect(createdBook.status).toBe("STARTED");
  });
});

// main/controllers/InMemoryCreateBookController.test.ts
describe("InMemoryCreateBookController", () => {
  it("must create a book using the controller", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateBookController = new InMemoryCreateBookController(
      inMemoryCreateBooks,
    );
    const httpRequest: HttpRequest<InMemoryCreateBookParams> = {
      body: {
        title: "1984",
        author: "George Orwell",
        volume: "1",
        status: "STARTED",
      },
    };
    // Act
    const httpResponse = await inMemoryCreateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      title: "1984",
      author: "George Orwell",
      volume: "1",
      status: "STARTED",
    });
  });
});
