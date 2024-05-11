import express from "express";
import { get } from "./BookServiceRoutes";

const bookRoutes = express.Router();

bookRoutes.get("/", get);

export default bookRoutes;
