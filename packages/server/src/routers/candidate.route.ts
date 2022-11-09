import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import CandidateController from "../controllers/candidates.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

class CandidateRoute implements Routes {
  public path = "/candidates";

  public router = Router();

  public candidateController = new CandidateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.candidateController.index);
    this.router.get(`${this.path}/:id`, this.candidateController.show);
    this.router.post(`${this.path}`, this.candidateController.store);
    this.router.put(`${this.path}/:id`, authMiddleware, this.candidateController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.candidateController.delete);
  }
}

export default CandidateRoute;
