import { createBookController } from "@/main/config/BookFactory";
import { Request, Response } from "express";

export async function createBook(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await createBookController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
}
