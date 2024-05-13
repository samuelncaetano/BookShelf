import express from "express";
import { createBook, getBook } from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getBook);

export default bookRoutes;
