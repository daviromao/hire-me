import { PrismaClient, Candidacy } from "@prisma/client";
import HttpException from "../exceptions/HttpException";

type CandidacyIncludes = {
  vacancy?: boolean;
  candidate?: boolean;
};

class CandidacyService {
  public candidacies = new PrismaClient().candidacy;

  public async findAll(includes?: CandidacyIncludes): Promise<Candidacy[]> {
    const allCandidacies: Candidacy[] = await this.candidacies.findMany({
      include: includes,
    });

    return allCandidacies;
  }

  public async findById(candidacyID: string, includes?: CandidacyIncludes): Promise<Candidacy> {
    const candidacy = await this.candidacies.findUnique({
      where: { id: candidacyID },
      include: includes,
    });

    if (!candidacy) throw new HttpException(404, "Candidacy doesn't exist");

    return candidacy;
  }

  public async findByVacancy(vacancyID: string, includes?: CandidacyIncludes): Promise<Candidacy[]> {
    const candidacies = await this.candidacies.findMany({
      where: { vacancyId: vacancyID },
      include: includes,
    });

    if (!candidacies) throw new HttpException(404, "Candidacies or Vacancy doesn't exist");

    return candidacies;
  }

  public async findByCandidate(candidateID: string, includes?: CandidacyIncludes): Promise<Candidacy[]> {
    const candidacies = await this.candidacies.findMany({
      where: { candidateId: candidateID },
      include: includes,
    });

    if (!candidacies) throw new HttpException(404, "Candidacies or Candidate doesn't exist");

    return candidacies;
  }

  public async create(vacancyID: string, candidateID: string, includes?: CandidacyIncludes): Promise<Candidacy> {
    const candidacy = await this.candidacies.create({
      data: {
        vacancyId: vacancyID,
        candidateId: candidateID,
      },
      include: includes,
    });

    return candidacy;
  }

  public async delete(candidacyID: string): Promise<Candidacy> {
    const candidacy = await this.candidacies.delete({
      where: { id: candidacyID },
    });

    if (!candidacy) throw new HttpException(404, "Candidacy doesn't exist");

    return candidacy;
  }
}

export default CandidacyService;
