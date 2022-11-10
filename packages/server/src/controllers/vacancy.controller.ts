import { Company, Vacancy } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import CreateVacancyDto from "../dtos/vacancy.dto";
import HttpException from "../exceptions/HttpException";
import VacancyService from "../services/vacancy.service";

class VacancyController {
  public vacancyService = new VacancyService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancies: Vacancy[] = await this.vacancyService.findAll();
      res.status(200).json({ data: vacancies });
    } catch (error) {
      next(error);
    }
  };

  public show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId: string = req.params.id;
      const vacancy: Vacancy = await this.vacancyService.findById(vacancyId);
      res.status(200).json({ data: vacancy });
    } catch (error) {
      next(error);
    }
  };

  public store = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyData: CreateVacancyDto = req.body;
      const createVacancyData: Vacancy = await this.vacancyService.create(vacancyData, user);
      res.status(201).json({ data: createVacancyData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public update = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId: string = req.params.id;
      const vacancyData: CreateVacancyDto = req.body;
      const vacancy: Vacancy = await this.vacancyService.findById(vacancyId);

      if (user.id !== vacancy.companyId) throw new HttpException(401, "Unauthorized");

      const updateVacancyData: Vacancy = await this.vacancyService.update(vacancyId, vacancyData);

      res.status(200).json({ data: updateVacancyData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId: string = req.params.id;
      const vacancy: Vacancy = await this.vacancyService.findById(vacancyId);

      if (user.id !== vacancy.companyId) throw new HttpException(401, "Unauthorized");

      await this.vacancyService.delete(vacancyId);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default VacancyController;
