import { Status as PrismaStatus } from "@prisma/client"; // Importe o enum Status do Prisma

export class BookModel {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public volume: number | null,
    public status: PrismaStatus,
  ) {}
}
