import { Status as PrismaStatus } from "@prisma/client";

export interface Book {
  id: string;
  title: string;
  author: string;
  volume: number | null;
  status: PrismaStatus | null;
}
