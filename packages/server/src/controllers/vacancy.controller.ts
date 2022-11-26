import { Company } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import CreateVacancyDto from "../dtos/vacancy.dto";
import HttpException from "../exceptions/HttpException";
import VacancyService from "../services/vacancy.service";
import { validate } from "../utils/validator";

class VacancyController {
  public vacancyService = new VacancyService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancies = await this.vacancyService.findAll({
        company: true,
      });
      res.status(200).json({ data: vacancies });
    } catch (error) {
      next(error);
    }
  };

  public findAllByCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const vacancies = await this.vacancyService.findByCompany(companyId);
      res.status(200).json({ data: vacancies });
    } catch (error) {
      next(error);
    }
  };

  public findOneWithCandidates = async (
    user: Company,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const vacancyId = req.params.id;
      const vacancy = await this.vacancyService.findById(vacancyId, {
        candidacies: {
          include: {
            candidate: true,
          },
        },
      });

      if (user.id !== vacancy.companyId) throw new HttpException(401, "Unauthorized");

      res.status(200).json({ data: vacancy });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = req.params.id;
      const vacancy = await this.vacancyService.findById(vacancyId);
      res.status(200).json({ data: vacancy });
    } catch (error) {
      next(error);
    }
  };

  public create = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyData = await validate(CreateVacancyDto, req.body);
      const createVacancyData = await this.vacancyService.create(vacancyData, user);
      res.status(201).json({ data: createVacancyData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public update = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = req.params.id;
      const vacancyData = await validate(CreateVacancyDto, req.body, { skipMissingProperties: true });
      const vacancy = await this.vacancyService.findById(vacancyId);

      if (user.id !== vacancy.companyId) throw new HttpException(403, "Forbidden");

      const updateVacancyData = await this.vacancyService.update(vacancyId, vacancyData);

      res.status(200).json({ data: updateVacancyData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = req.params.id;
      const vacancy = await this.vacancyService.findById(vacancyId);

      if (user.id !== vacancy.companyId) throw new HttpException(401, "Unauthorized");

      await this.vacancyService.delete(vacancyId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

export default VacancyController;
