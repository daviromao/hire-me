import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";

class AuthRoute implements Routes {
  public path = "/auth";

  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:type(candidate|company)/login`, this.authController.logIn);
  }
}

export default AuthRoute;
