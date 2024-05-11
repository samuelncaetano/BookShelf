import express, { Express, RequestHandler } from "express";

import bookRoutes from "./bookRoutes/BookRoutes";

class Server {
  private app: Express;
  private port!: number;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.port = parseInt("3000");
  }

  public routes(...routes: RequestHandler[]): void {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.routes(bookRoutes);
server.start();
