import { Router } from "express";
import VacancyController from "../controllers/vacancy.controller";
import { Routes } from "../interfaces/routes.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

class VacancyRoute implements Routes {
  public path = "/vacancies";

  public router = Router();

  public vacancyController = new VacancyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.vacancyController.index);
    this.router.get(`${this.path}/:id`, this.vacancyController.show);
    this.router.post(this.path, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.store);
    this.router.put(`${this.path}/:id`, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.delete);
  }
}

export default VacancyRoute;
