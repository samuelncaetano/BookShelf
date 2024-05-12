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
      volume: 1,
      status: "STARTED",
    };

    // Act
    const createdBook = await inMemoryCreateBooks.createBook(bookParams);

    // Assert
    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe("1984");
    expect(createdBook.author).toBe("George Orwell");
    expect(createdBook.volume).toBe(1);
    expect(createdBook.status).toBe("STARTED");
  });
  it("Must create a book in memory without any params", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const bookParams: InMemoryCreateBookParams = {};

    // Act
    const createdBook = await inMemoryCreateBooks.createBook(bookParams);

    // Assert
    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe(null);
    expect(createdBook.author).toBe(null);
    expect(createdBook.volume).toBe(null);
    expect(createdBook.status).toBe("NOT_STARTED");
  });
});

// main/controllers/InMemoryCreateBookController.test.ts
describe("InMemoryCreateBookController", () => {
  it("should create a book and return a successful response", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateBookController = new InMemoryCreateBookController(
      inMemoryCreateBooks,
    );
    const httpRequest: HttpRequest<InMemoryCreateBookParams> = {
      body: {
        title: "1984",
        author: "George Orwell",
        volume: 1,
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
      volume: 1,
      status: "STARTED",
    });
  });

  it("should return a bad request response if the request body is invalid", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateBookController = new InMemoryCreateBookController(
      inMemoryCreateBooks,
    );
    const httpRequest: HttpRequest<InMemoryCreateBookParams> = {
      body: {
        title: "1984",
        // author: "George Orwell",
        volume: 1,
        status: "STARTED",
      },
    };
    // Act
    const httpResponse = await inMemoryCreateBookController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Field author is Required");
  });

  it("should return a server error response if an error occurs during book creation", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();

    vi.spyOn(inMemoryCreateBooks, "createBook").mockRejectedValueOnce(
      new Error("Failed to create book"),
    );

    const inMemoryCreateBookController = new InMemoryCreateBookController(
      inMemoryCreateBooks,
    );

    const httpRequest: HttpRequest<InMemoryCreateBookParams> = {
      body: {
        title: "1984",
        author: "George Orwell",
        volume: 1,
        status: "STARTED",
      },
    };
    // Act
    const httpResponse = await inMemoryCreateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
