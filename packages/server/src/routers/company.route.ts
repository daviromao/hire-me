import { Router } from "express";
import CompanyController from "../controllers/companies.controller";
import { Routes } from "../interfaces/routes.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

class CompanyRoute implements Routes {
  public path = "/companies";

  public router = Router();

  public companyController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.companyController.index);
    this.router.get(`${this.path}/:id`, this.companyController.show);
    this.router.post(`${this.path}`, this.companyController.store);
    this.router.put(`${this.path}/:id`, authMiddleware, this.companyController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.companyController.delete);
  }
}

export default CompanyRoute;
