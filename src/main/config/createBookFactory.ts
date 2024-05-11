import { PrismaCreateBooks } from "@/infrastructure/database/prismaCreateBooks";
import { CreateBookController } from "../controllers/createBookController";

const prismaCreateBooks = new PrismaCreateBooks();
const createBookController = new CreateBookController(prismaCreateBooks);

export { createBookController };
