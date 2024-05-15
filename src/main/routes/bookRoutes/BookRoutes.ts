import express from "express";
import {
  createBook,
  createManyBooks,
  deleteBook,
  deleteBooksById,
  getBook,
  getBooksById,
} from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.post("/many", createManyBooks);
bookRoutes.get("/", getBook);
bookRoutes.get("/:id", getBooksById);
bookRoutes.delete("/", deleteBook);
bookRoutes.delete("/:id", deleteBooksById);

export default bookRoutes;
