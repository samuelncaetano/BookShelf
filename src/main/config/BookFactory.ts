import { PrismaCreateBooks } from "@/infrastructure/database/prisma/prismaCreateBooks";
import { PrismaGetBooks } from "@/infrastructure/database/prisma/prismaGetBooks";

import { CreateBookController } from "../controllers/createBookController";
import { GetBooksController } from "../controllers/getBooksController";

const prismaCreateBooks = new PrismaCreateBooks();
const createBookController = new CreateBookController(prismaCreateBooks);

const prismaGetBooks = new PrismaGetBooks();
const getBooksController = new GetBooksController(prismaGetBooks);

export { createBookController, getBooksController };
