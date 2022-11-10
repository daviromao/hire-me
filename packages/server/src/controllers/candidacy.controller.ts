import { Candidacy, Candidate } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import CandidacyService from "../services/candidacy.service";

class CandidacyController {
  public candidacyService = new CandidacyService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidacies: Candidacy[] = await this.candidacyService.findAll();
      res.status(200).json({ candidacies });
    } catch (error) {
      next(error);
    }
  };

  public show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidacyId: string = req.params.id;
      const candidacy: Candidacy = await this.candidacyService.findById(candidacyId, {
        candidate: true,
        vacancy: true,
      });
      res.status(200).json({ candidacy });
    } catch (error) {
      next(error);
    }
  };

  public store = async (user: Candidate, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { vacancyId } = req.params;
      const createCandidacyData = await this.candidacyService.create(vacancyId, user.id);
      res.status(201).json({ data: createCandidacyData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (user: Candidate, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidacyId: string = req.params.id;
      const candidacy: Candidacy = await this.candidacyService.findById(candidacyId);

      if (user.id !== candidacy.candidateId) throw new HttpException(401, "Unauthorized");

      await this.candidacyService.delete(candidacyId);

      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default CandidacyController;
