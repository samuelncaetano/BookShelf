import express from "express";
import { createBook } from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);

export default bookRoutes;
