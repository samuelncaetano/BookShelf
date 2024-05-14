import {
  InMemoryDeleteBooksByIdController,
  InMemoryDeleteBooks,
  InMemoryDeleteBookController,
} from "@/infrastructure/database/InMemoryRepository/InMemoryDeleteBookRepository";

// infrastructure/database/InMemoryDeleteBooks.ts
describe("InMemoryDeleteBooksRepository", () => {
  it("should delete all books", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();

    // Act
    const deletedBook = await inMemoryDeleteBooks.deleteBooks();

    // Assert
    expect(deletedBook).toBeDefined();
    expect(deletedBook).toEqual([]);
  });

  it("should delete a book when a valid ID is provided", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const booksAfterDeletion = inMemoryDeleteBooks.getBooks();
    const validId = "2024";

    // Act
    const deletedBook = await inMemoryDeleteBooks.deleteBooksById(validId);

    // Assert
    expect(deletedBook).toBeDefined();
    expect(deletedBook).toEqual({
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    });
    expect(booksAfterDeletion).toEqual([
      {
        id: "2025",
        title: "1984",
        author: "George Orwell",
        volume: 0,
        status: "NOT_STARTED",
      },
    ]);
  });

  it("should return null when an invalid ID is provided", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const invalidId = "invalid_id";

    // Act
    const deletedBook = await inMemoryDeleteBooks.deleteBooksById(invalidId);

    // Assert
    expect(deletedBook).toBeNull();
  });
});

// main/controllers/InMemoryDeleteBookController.ts
describe("InMemoryDeleteBookController", () => {
  it("should delete all books", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const inMemoryDeleteBookController = new InMemoryDeleteBookController(
      inMemoryDeleteBooks,
    );
    // Act
    const httpResponse = await inMemoryDeleteBookController.handle();
    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([]);
  });
  it("should return a server error response", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    vi.spyOn(inMemoryDeleteBooks, "deleteBooks").mockRejectedValueOnce(
      new Error("Failed to get the book"),
    );
    const inMemoryDeleteBookController = new InMemoryDeleteBookController(
      inMemoryDeleteBooks,
    );
    // Act
    const httpResponse = await inMemoryDeleteBookController.handle();
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});

// main/controllers/InMemoryDeleteBooksByIdController.ts
describe("InMemoryDeleteBooksByIdController", () => {
  it("should delete a book using an id", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const booksAfterDeletion = inMemoryDeleteBooks.getBooks();
    const inMemoryDeleteBooksByIdController =
      new InMemoryDeleteBooksByIdController(inMemoryDeleteBooks);
    // Act
    const validId: any = "2024";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryDeleteBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "2024",
      title: "1984",
      author: "George Orwell",
      volume: 0,
      status: "NOT_STARTED",
    });
    expect(booksAfterDeletion).toEqual([
      {
        id: "2025",
        title: "1984",
        author: "George Orwell",
        volume: 0,
        status: "NOT_STARTED",
      },
    ]);
  });
  it("should return an error if it does not have an id", async () => {
    // Arrange
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const booksAfterDeletion = inMemoryDeleteBooks.getBooks();
    const inMemoryDeleteBooksByIdController =
      new InMemoryDeleteBooksByIdController(inMemoryDeleteBooks);
    // Act
    const validId: any = "";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryDeleteBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Missing user id");
    expect(booksAfterDeletion).toEqual([
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
    const inMemoryDeleteBooks = new InMemoryDeleteBooks();
    const booksAfterDeletion = inMemoryDeleteBooks.getBooks();
    vi.spyOn(inMemoryDeleteBooks, "deleteBooksById").mockRejectedValueOnce(
      new Error("Failed to get the book"),
    );
    const inMemoryDeleteBooksByIdController =
      new InMemoryDeleteBooksByIdController(inMemoryDeleteBooks);
    // Act
    const validId: any = "2024";
    const httpRequest: any = {
      params: {
        id: validId,
      },
    };
    const httpResponse =
      await inMemoryDeleteBooksByIdController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
    expect(booksAfterDeletion).toEqual([
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
