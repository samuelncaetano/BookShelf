import {
  InMemoryGetBooks,
  InMemoryGetBookController,
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
        id: "2024",
        title: "1984",
        author: "George Orwell",
        volume: 0,
        status: "NOT_STARTED",
      },
    ]);
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
        id: "2024",
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
