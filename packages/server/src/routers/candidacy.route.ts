import { Router } from "express";
import CandidacyController from "../controllers/candidacy.controller";
import { Routes } from "../interfaces/routes.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

class CandidacyRoute implements Routes {
  public path = "/candidacies";

  public router = Router();

  public candidacyController = new CandidacyController();

  public constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.candidacyController.findOne);

    this.router.post(
      `/vacancies/:vacancyId${this.path}`,
      authMiddleware,
      roleMiddleware("CANDIDATE"),
      this.candidacyController.store,
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware("CANDIDATE"),
      this.candidacyController.delete,
    );
  }
}

export default CandidacyRoute;
