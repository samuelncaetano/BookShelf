import {
  InMemoryGetBooks,
  InMemoryGetBookController,
  InMemoryGetBooksByIdController,
} from "@/infrastructure/database/InMemoryRepository/InMemoryGetBookRepository";

// infrastructure/database/InMemoryGetBooks.ts
describe("InMemoryGetBooks", () => {
  it("Should have a book in memory", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    // Act
    const gedBook = await inMemoryGetBooks.getBooks();
    // Assert
    expect(gedBook).toBeDefined();
    expect(gedBook).toEqual([
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

describe("InMemoryGetByIdBooks", () => {
  it("should return a book when a valid ID is provided", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    const validId = "2024";

    // Act
    const book = await inMemoryGetBooks.getBooksById(validId);

    // Assert
    expect(book).toBeDefined();
    expect(book?.id).toBe(validId);
  });
  it("should return null when an invalid ID is provided", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    const invalidId = "invalid_id";

    // Act
    const book = await inMemoryGetBooks.getBooksById(invalidId);

    // Assert
    expect(book).toBeNull();
  });
});

// main/controllers/InMemoryGetBookController.ts
describe("InMemoryGetBookController", () => {
  it("should return a list of books", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    const inMemoryGetBookController = new InMemoryGetBookController(
      inMemoryGetBooks,
    );
    // Act
    const httpResponse = await inMemoryGetBookController.handle();
    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
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
  it("should return a server error response", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    vi.spyOn(inMemoryGetBooks, "getBooks").mockRejectedValueOnce(
      new Error("Failed to get the book"),
    );
    const inMemoryGetBookController = new InMemoryGetBookController(
      inMemoryGetBooks,
    );
    // Act
    const httpResponse = await inMemoryGetBookController.handle();
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
describe("InMemoryGetBooksByIdController", () => {
  it("should return a book", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    const inMemoryGetBooksByIdController = new InMemoryGetBooksByIdController(
      inMemoryGetBooks,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryGetBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    });
  });
  it("should return an error if it does not have an id", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    const inMemoryGetBooksByIdController = new InMemoryGetBooksByIdController(
      inMemoryGetBooks,
    );
    // Act
    const validId: any = "";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryGetBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Missing user id");
  });
  it("should return a server error response", async () => {
    // Arrange
    const inMemoryGetBooks = new InMemoryGetBooks();
    vi.spyOn(inMemoryGetBooks, "getBooksById").mockRejectedValueOnce(
      new Error("Failed to get the book"),
    );
    const inMemoryGetBooksByIdController = new InMemoryGetBooksByIdController(
      inMemoryGetBooks,
    );
    // Act
    const validId: any = "2024";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryGetBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
