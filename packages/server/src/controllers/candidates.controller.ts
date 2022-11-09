import { Candidate } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import CreateCandidateDto from "../dtos/candidates.dto";
import HttpException from "../exceptions/HttpException";
import CandidateService from "../services/candidate.service";

class CandidateController {
  public candidateService = new CandidateService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidates: Candidate[] = await this.candidateService.findAll();
      res.status(200).json({ candidates });
    } catch (error) {
      next(error);
    }
  };

  public show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidateId = req.params.id;
      const candidate: Candidate = await this.candidateService.findById(candidateId);
      res.status(200).json({ candidate });
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidateData: CreateCandidateDto = req.body;
      const createCandidateData: Candidate = await this.candidateService.create(candidateData);
      res.status(201).json({ data: createCandidateData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public update = async (user: Candidate, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidateId = req.params.id;
      const candidateData: CreateCandidateDto = req.body;
      const candidate = await this.candidateService.findById(candidateId);

      if (user.id !== candidate.id) throw new HttpException(401, "Unauthorized");

      const updateCandidateData: Candidate = await this.candidateService.update(candidateId, candidateData);
      res.status(200).json({ data: updateCandidateData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (user: Candidate, req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const candidateId = req.params.id;
      const candidate = await this.candidateService.findById(candidateId);

      if (user.id !== candidate.id) throw new HttpException(401, "Unauthorized");

      await this.candidateService.delete(candidateId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

export default CandidateController;
