import { Company } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import CreateCompanyDto from "../dtos/companies.dto";
import HttpException from "../exceptions/HttpException";
import CompanyService from "../services/company.service";
import { validate } from "../utils/validator";

class CompanyController {
  public companyService = new CompanyService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companies = await this.companyService.findAll();
      res.status(200).json({ companies });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const company = await this.companyService.findById(companyId);
      res.status(200).json({ company });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyData = await validate(CreateCompanyDto, req.body);
      const createCompanyData = await this.companyService.create(companyData);
      res.status(201).json({ data: createCompanyData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public update = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const companyData = await validate(CreateCompanyDto, req.body, { skipMissingProperties: true });
      const company = await this.companyService.findById(companyId);

      if (user.id !== company.id) throw new HttpException(401, "Unauthorized");

      const updateCompanyData = await this.companyService.update(companyId, companyData);
      res.status(200).json({ data: updateCompanyData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (user: Company, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const company = await this.companyService.findById(companyId);

      if (user.id !== company.id) throw new HttpException(401, "Unauthorized");

      await this.companyService.delete(companyId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
