import { Request, Response } from "express";

export async function get(_: Request, res: Response): Promise<void> {
  res.status(200).json({
    message: "Hello world",
  });
}
