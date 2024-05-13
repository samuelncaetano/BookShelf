import {
  createBookController,
  getBooksByIdController,
  getBooksController,
} from "@/main/config/BookFactory";
import { Request, Response } from "express";

export async function createBook(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await createBookController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
}

export async function getBook(_: Request, res: Response): Promise<void> {
  const { body, statusCode } = await getBooksController.handle();
  res.status(statusCode).send(body);
}

export async function getBooksById(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await getBooksByIdController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
}
