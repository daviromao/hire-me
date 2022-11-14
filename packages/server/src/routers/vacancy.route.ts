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
    this.router.get(this.path, this.vacancyController.findAll);
    this.router.get(`${this.path}/:id`, this.vacancyController.findOne);
    this.router.get(`companies/:companyId${this.path}`, this.vacancyController.findAllByCompany);
    this.router.post(this.path, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware("COMPANY"), this.vacancyController.delete);
    this.router.get(
      `${this.path}/:id/candidacies`,
      authMiddleware,
      roleMiddleware("COMPANY"),
      this.vacancyController.findOneWithCandidates,
    );
  }
}

export default VacancyRoute;
