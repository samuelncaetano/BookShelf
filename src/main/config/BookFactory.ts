import { PrismaCreateBooks } from "@/infrastructure/database/prisma/prismaCreateBooks";
import { PrismaGetBooks } from "@/infrastructure/database/prisma/prismaGetBooks";
import { PrismaDeleteBooks } from "@/infrastructure/database/prisma/prismaDeleteBooks";

import { CreateBookController } from "../controllers/createBookController";
import {
  GetBooksController,
  GetBooksByIdController,
} from "../controllers/getBooksController";
import {
  DeleteBookController,
  DeleteBooksByIdController,
} from "../controllers/deleteBooksController";

//Create
const prismaCreateBooks = new PrismaCreateBooks();
const createBookController = new CreateBookController(prismaCreateBooks);

//Get
const prismaGetBooks = new PrismaGetBooks();
const getBooksController = new GetBooksController(prismaGetBooks);
const getBooksByIdController = new GetBooksByIdController(prismaGetBooks);

//Delete
const prismaDeleteBooks = new PrismaDeleteBooks();
const deleteBookController = new DeleteBookController(prismaDeleteBooks);
const deleteBooksByIdController = new DeleteBooksByIdController(
  prismaDeleteBooks,
);

export {
  createBookController,
  getBooksController,
  getBooksByIdController,
  deleteBookController,
  deleteBooksByIdController,
};
