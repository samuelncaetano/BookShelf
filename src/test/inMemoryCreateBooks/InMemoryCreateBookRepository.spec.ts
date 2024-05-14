import {
  InMemoryCreateBooks,
  InMemoryCreateBookParams,
  InMemoryCreateBookController,
  InMemoryCreateManyBookController,
} from "@/infrastructure/database/InMemoryRepository/InMemoryCreateBookRepository";
import { HttpRequest } from "@/main/config/helpers/protocols";

// infrastructure/database/InMemoryCreateBooks.ts
describe("InMemoryCreateBooks", () => {
  it("should create a book in memory", async () => {
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
  it("should create a book in memory without any params", async () => {
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
  it("should create many books", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const bookParams: InMemoryCreateBookParams[] = [
      {
        title: "1984",
        author: "George Orwell",
      },
      {
        title: "1984",
        author: "George Orwell",
        volume: 1,
        status: "STARTED",
      },
    ];
    // Act
    const createdBooks = await inMemoryCreateBooks.createManyBooks(bookParams);
    // Assert
    expect(createdBooks).toBeDefined();
    expect(createdBooks).toHaveLength(2);

    expect(createdBooks[0].title).toBe("1984");
    expect(createdBooks[0].author).toBe("George Orwell");
    expect(createdBooks[0].volume).toBe(null);
    expect(createdBooks[0].status).toBe("NOT_STARTED");

    expect(createdBooks[1].title).toBe("1984");
    expect(createdBooks[1].author).toBe("George Orwell");
    expect(createdBooks[1].volume).toBe(1);
    expect(createdBooks[1].status).toBe("STARTED");
  });
  it("should create a book in memory without any params", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const bookParams: InMemoryCreateBookParams[] = [{}];
    // Act
    const createdBooks = await inMemoryCreateBooks.createManyBooks(bookParams);
    // Assert
    expect(createdBooks).toBeDefined();
    expect(createdBooks[0].title).toBe(null);
    expect(createdBooks[0].author).toBe(null);
    expect(createdBooks[0].volume).toBe(null);
    expect(createdBooks[0].status).toBe("NOT_STARTED");
  });
});

// main/controllers/InMemoryCreateBookController.ts
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
  it("should create a book even without the volume and status defined", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateBookController = new InMemoryCreateBookController(
      inMemoryCreateBooks,
    );
    const httpRequest: HttpRequest<InMemoryCreateBookParams> = {
      body: {
        title: "1984",
        author: "George Orwell",
      },
    };
    // Act
    const httpResponse = await inMemoryCreateBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      title: "1984",
      author: "George Orwell",
      volume: null,
      status: "NOT_STARTED",
    });
  });
});

// main/controllers/InMemoryCreateManyBookController.ts
describe("InMemoryCreateManyBookController", () => {
  it("should create many books and return a successful response", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateManyBookController =
      new InMemoryCreateManyBookController(inMemoryCreateBooks);
    const httpRequest: HttpRequest<InMemoryCreateBookParams[]> = {
      body: [
        {
          title: "1984",
          author: "George Orwell",
        },
        {
          title: "1984",
          author: "George Orwell",
          volume: 1,
          status: "STARTED",
        },
      ],
    };
    // Act
    const httpResponse =
      await inMemoryCreateManyBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual([
      {
        title: "1984",
        author: "George Orwell",
        volume: null,
        status: "NOT_STARTED",
      },
      {
        title: "1984",
        author: "George Orwell",
        volume: 1,
        status: "STARTED",
      },
    ]);
  });
  it("should return a bad request response if the request body is invalid", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateManyBookController =
      new InMemoryCreateManyBookController(inMemoryCreateBooks);
    const httpRequest: HttpRequest<InMemoryCreateBookParams[]> = {
      body: [
        {
          title: "1984",
          author: "George Orwell",
        },
        {
          // title: "1984",
          // author: "George Orwell",
        },
      ],
    };

    // Act
    const httpResponse =
      await inMemoryCreateManyBookController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      "Field title is Required, Field author is Required",
    );
  });

  it("should return a server error response if an error occurs during book creation", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    vi.spyOn(inMemoryCreateBooks, "createManyBooks").mockRejectedValueOnce(
      new Error("Failed to create book"),
    );
    const inMemoryCreateManyBookController =
      new InMemoryCreateManyBookController(inMemoryCreateBooks);
    const httpRequest: HttpRequest<InMemoryCreateBookParams[]> = {
      body: [
        {
          title: "1984",
          author: "George Orwell",
        },
        {
          title: "1984",
          author: "George Orwell",
          volume: 1,
          status: "STARTED",
        },
      ],
    };
    // Act
    const httpResponse =
      await inMemoryCreateManyBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
  it("should create a book even without the volume and status defined", async () => {
    // Arrange
    const inMemoryCreateBooks = new InMemoryCreateBooks();
    const inMemoryCreateManyBookController =
      new InMemoryCreateManyBookController(inMemoryCreateBooks);
    const httpRequest: HttpRequest<InMemoryCreateBookParams[]> = {
      body: [
        {
          title: "1984",
          author: "George Orwell",
        },
        {
          title: "1984",
          author: "George Orwell",
        },
      ],
    };
    // Act
    const httpResponse =
      await inMemoryCreateManyBookController.handle(httpRequest);
    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual([
      {
        title: "1984",
        author: "George Orwell",
        volume: null,
        status: "NOT_STARTED",
      },
      {
        title: "1984",
        author: "George Orwell",
        volume: null,
        status: "NOT_STARTED",
      },
    ]);
  });
});
