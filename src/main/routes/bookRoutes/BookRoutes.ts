import express from "express";
import {
  createBook,
  createManyBooks,
  getBook,
  getBooksById,
  updateBook,
  deleteBook,
  deleteBooksById,
} from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.post("/many", createManyBooks);
bookRoutes.get("/", getBook);
bookRoutes.get("/:id", getBooksById);
bookRoutes.patch("/:id", updateBook);
bookRoutes.delete("/", deleteBook);
bookRoutes.delete("/:id", deleteBooksById);

export default bookRoutes;
