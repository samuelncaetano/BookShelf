import { PrismaCreateBooks } from "@/infrastructure/database/prisma/prismaCreateBooks";
import { PrismaGetBooks } from "@/infrastructure/database/prisma/prismaGetBooks";
import { PrismaUpdateBooks } from "@/infrastructure/database/prisma/prismaUpdateBooks";
import { PrismaDeleteBooks } from "@/infrastructure/database/prisma/prismaDeleteBooks";

import {
  CreateBookController,
  CreateManyBookController,
} from "../controllers/createBookController";
import {
  GetBooksController,
  GetBooksByIdController,
} from "../controllers/getBooksController";
import {
  DeleteBookController,
  DeleteBooksByIdController,
} from "../controllers/deleteBooksController";
import { UpdateBookController } from "../controllers/updateBookController";

//Create
const prismaCreateBooks = new PrismaCreateBooks();
const createBookController = new CreateBookController(prismaCreateBooks);
const createManyBookController = new CreateManyBookController(
  prismaCreateBooks,
);

//Get
const prismaGetBooks = new PrismaGetBooks();
const getBooksController = new GetBooksController(prismaGetBooks);
const getBooksByIdController = new GetBooksByIdController(prismaGetBooks);

//Update
const prismaUpdateBooks = new PrismaUpdateBooks();
const updateBookController = new UpdateBookController(prismaUpdateBooks);

//Delete
const prismaDeleteBooks = new PrismaDeleteBooks();
const deleteBookController = new DeleteBookController(prismaDeleteBooks);
const deleteBooksByIdController = new DeleteBooksByIdController(
  prismaDeleteBooks,
);

export {
  createBookController,
  createManyBookController,
  getBooksController,
  getBooksByIdController,
  updateBookController,
  deleteBookController,
  deleteBooksByIdController,
};
