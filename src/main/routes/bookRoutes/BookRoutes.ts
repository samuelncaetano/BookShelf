import express from "express";
import { createBook, getBook, getBooksById } from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getBook);
bookRoutes.get("/:id", getBooksById);

export default bookRoutes;
