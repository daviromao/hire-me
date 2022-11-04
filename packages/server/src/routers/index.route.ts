import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import IndexController from "../controllers/index.controller";

class IndexRouter implements Routes {
  public path = "/";

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, IndexController.index);
  }
}

export default IndexRouter;
