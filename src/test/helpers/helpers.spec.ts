import { describe, it, expect } from "vitest";
import {
  niceRequest,
  createdRequest,
  badRequest,
  serverError,
} from "@/main/config/helpers/helpers";

// main/controllers/helpers.ts
describe("Helpers", () => {
  it("should return a response with status code 200 and the provided data when data is an InMemoryBook", () => {
    // Arrange
    const data = { body: { title: "1984", author: "George Orwell" } };
    // Act
    const response = niceRequest(data);
    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(data);
  });

  it("should return a response with status code 201 and the provided data when data is an InMemoryBook", () => {
    // Arrange
    const data = { body: { title: "1984", author: "George Orwell" } };
    // Act
    const response = createdRequest(data);
    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(data);
  });

  it("should return a response with status code 400 and an error message", () => {
    // Arrange
    const errorMessage = "Something went wrong.";
    // Act
    const response = badRequest(errorMessage);
    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(errorMessage);
  });

  it("should return a response with status code 500 and an error message", () => {
    // Arrange
    const errorMessage = "Something went wrong.";
    // Act
    const response = serverError();
    // Assert
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(errorMessage);
  });
});
