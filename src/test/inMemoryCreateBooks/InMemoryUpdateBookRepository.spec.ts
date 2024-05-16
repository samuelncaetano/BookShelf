import {
  InMemoryUpdateBook,
  InMemoryUpdateBookController,
  InMemoryUpdateBookParams,
} from "@/infrastructure/database/InMemoryRepository/InMemoryUpdateBookRepository";
import { HttpRequest } from "@/main/config/helpers/protocols";

// infrastructure/database/InMemoryUpdateBooks.ts
describe("InMemoryUpdateBooks", () => {
  it("should update a book in memory", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const validId = "2024";
    const updateBookParams: InMemoryUpdateBookParams = {
      title: "Admirável mundo novo",
      author: "Aldous Huxley",
      volume: 1,
      status: "STARTED",
    };

    // Act
    const booksAfterUpdate = inMemoryUpdateBook.getBooks();
    const updateBook = await inMemoryUpdateBook.updateBook(
      validId,
      updateBookParams,
    );

    // Assert
    expect(updateBook).toBeDefined();
    expect(updateBook).toEqual({
      id: "2024",
      title: "Admirável mundo novo",
      author: "Aldous Huxley",
      volume: 1,
      status: "STARTED",
    });
    expect(booksAfterUpdate).toEqual([
      {
        id: "2024",
        title: "Admirável mundo novo",
        author: "Aldous Huxley",
        volume: 1,
        status: "STARTED",
      },
      {
        id: "2025",
        title: "1984",
        author: "George Orwell",
        volume: 0,
        status: "NOT_STARTED",
      },
    ]);
  });
  it("should create a book in memory without any params", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const validId = "2024";
    const updateBookParams: InMemoryUpdateBookParams = {
      // title: "Admirável mundo novo",
      // author: "Aldous Huxley",
      // volume: 1,
      // status: "STARTED",
    };

    // Act
    const booksAfterUpdate = inMemoryUpdateBook.getBooks();
    const updateBook = await inMemoryUpdateBook.updateBook(
      validId,
      updateBookParams,
    );

    // Assert
    expect(updateBook).toBeDefined();
    expect(updateBook).toEqual({
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    });
    expect(booksAfterUpdate).toEqual([
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
    ]);
  });
});

// main/controllers/InMemoryUpdateBookController.ts
describe("InMemoryUpdateBookController", () => {
  it("should create a book and return a successful response", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const inMemoryUpdateBookController = new InMemoryUpdateBookController(
      inMemoryUpdateBook,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: HttpRequest<InMemoryUpdateBookParams> = {
      params: {
        id: validId,
      },
      body: {
        title: "Admirável mundo novo",
        author: "Aldous Huxley",
        volume: 1,
        status: "STARTED",
      },
    };
    const httpResponse = await inMemoryUpdateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      title: "Admirável mundo novo",
      author: "Aldous Huxley",
      volume: 1,
      status: "STARTED",
    });
  });
  it("should return an error if it does not have an id", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const inMemoryUpdateBookController = new InMemoryUpdateBookController(
      inMemoryUpdateBook,
    );
    // Act
    const validId: any = "";
    const httpRequest: HttpRequest<InMemoryUpdateBookParams> = {
      params: {
        id: validId,
      },
      body: {
        title: "Admirável mundo novo",
        author: "Aldous Huxley",
        volume: 1,
        status: "STARTED",
      },
    };
    const httpResponse = await inMemoryUpdateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Missing user id");
  });
  it("should return a bad request response if the request body is invalid", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const inMemoryUpdateBookController = new InMemoryUpdateBookController(
      inMemoryUpdateBook,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: HttpRequest<InMemoryUpdateBookParams> = {
      params: {
        id: validId,
      },
      body: {
        title: "Admirável mundo novo",
        // author: "Aldous Huxley",
        volume: 1,
        status: "STARTED",
      },
    };
    const httpResponse = await inMemoryUpdateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Field author is Required");
  });
  it("should update a book even without the volume and status defined", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    const inMemoryUpdateBookController = new InMemoryUpdateBookController(
      inMemoryUpdateBook,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: HttpRequest<InMemoryUpdateBookParams> = {
      params: {
        id: validId,
      },
      body: {
        title: "Admirável mundo novo",
        author: "Aldous Huxley",
      },
    };
    const httpResponse = await inMemoryUpdateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      title: "Admirável mundo novo",
      author: "Aldous Huxley",
      volume: 0,
      status: "NOT_STARTED",
    });
  });
  it("should return a server error response if an error occurs while updating the book", async () => {
    // Arrange
    const inMemoryUpdateBook = new InMemoryUpdateBook();
    vi.spyOn(inMemoryUpdateBook, "updateBook").mockRejectedValueOnce(
      new Error("Failed to get the book"),
    );
    const inMemoryUpdateBookController = new InMemoryUpdateBookController(
      inMemoryUpdateBook,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: HttpRequest<InMemoryUpdateBookParams> = {
      params: {
        id: validId,
      },
      body: {
        title: "Admirável mundo novo",
        author: "Aldous Huxley",
        volume: 1,
        status: "STARTED",
      },
    };
    const httpResponse = await inMemoryUpdateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
