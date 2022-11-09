/* eslint-disable no-console */
import express from "express";
import config from "./configs/config.base";
import { Routes } from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public server: express.Application;

  public port: string | number;

  constructor(routes: Routes[]) {
    this.server = express();
    this.port = config.API_PORT || 3333;
    this.middlewares();
    this.routes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`___________________________________________\n`);
      console.log(`🚀 App listening on http://localhost:${this.port}`);
      console.log(`___________________________________________`);
    });
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private routes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.server.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.server.use(errorMiddleware);
  }
}

export default App;
