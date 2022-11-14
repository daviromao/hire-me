import { Candidate } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import { User } from "../configs/user.config";
import HttpException from "../exceptions/HttpException";
import CandidacyService from "../services/candidacy.service";

class CandidacyController {
  public candidacyService = new CandidacyService();

  public findOne = async (user: User, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidacyId = req.params.id;
      const candidacy = await this.candidacyService.findById(candidacyId, {
        candidate: true,
        vacancy: true,
      });

      if (user.id !== candidacy.candidateId && user.id !== (candidacy as any).vacancy.companyId) {
        throw new HttpException(401, "Unauthorized");
      }

      res.status(200).json({ data: candidacy });
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
      const candidacyId = req.params.id;
      const candidacy = await this.candidacyService.findById(candidacyId);

      if (user.id !== candidacy.candidateId) throw new HttpException(401, "Unauthorized");

      await this.candidacyService.delete(candidacyId);

      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default CandidacyController;
