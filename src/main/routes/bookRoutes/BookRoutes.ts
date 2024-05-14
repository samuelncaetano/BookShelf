import express from "express";
import {
  createBook,
  deleteBook,
  deleteBooksById,
  getBook,
  getBooksById,
} from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getBook);
bookRoutes.get("/:id", getBooksById);
bookRoutes.delete("/", deleteBook);
bookRoutes.delete("/:id", deleteBooksById);

export default bookRoutes;
