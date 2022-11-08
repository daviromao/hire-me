import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import IndexController from "../controllers/index.controller";

class IndexRouter implements Routes {
  public path = "/";

  public router = Router();

  public indexControler = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.indexControler.index);
  }
}

export default IndexRouter;
