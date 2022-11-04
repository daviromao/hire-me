/* eslint-disable no-console */
import express from "express";
import config from "./configs/config.base";
import { Routes } from "./interfaces/routes.interface";

class App {
  public server: express.Application;

  public port: string | number;

  constructor(routes: Routes[]) {
    this.server = express();
    this.port = config.API_PORT || 3333;
    this.middlewares();
    this.routes(routes);
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
  }

  private routes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.server.use("/", route.router);
    });
  }
}

export default App;
