import { Request, Response, NextFunction } from "express";
import CompanyService from "../services/company.service";

class CompanyController {
  public companyService = new CompanyService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companies = await this.companyService.findAll();
      res.status(200).json({ companies });
    } catch (error) {
      next(error);
    }
  };

  public show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const company = await this.companyService.findById(companyId);
      res.status(200).json({ company });
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyData = req.body;
      const createCompanyData = await this.companyService.create(companyData);
      res.status(201).json({ data: createCompanyData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const companyData = req.body;
      const updateCompanyData = await this.companyService.update(companyId, companyData);
      res.status(200).json({ data: updateCompanyData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companyId = req.params.id;
      const deleteCompanyData = await this.companyService.delete(companyId);
      res.status(200).json({ data: deleteCompanyData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
