import { hash } from "bcrypt";
import { PrismaClient, Candidate } from "@prisma/client";
import { UserService } from "../interfaces/user-services.interface";
import CreateCandidateDto from "../dtos/candidates.dto";
import HttpException from "../exceptions/HttpException";

class CandidateService implements UserService {
  public candidates = new PrismaClient().candidate;

  public async findAll(): Promise<Candidate[]> {
    const allCandidates: Candidate[] = await this.candidates.findMany();

    return allCandidates;
  }

  public async findById(candidateID: string): Promise<Candidate> {
    const findCandidate: Candidate | null = await this.candidates.findUnique({
      where: { id: candidateID },
    });

    if (!findCandidate) throw new HttpException(409, "Candidate doesn't exist");

    return findCandidate;
  }

  public async findByEmail(candidateEmail: string): Promise<Candidate> {
    const findCandidate: Candidate | null = await this.candidates.findUnique({
      where: { email: candidateEmail },
    });

    if (!findCandidate) throw new HttpException(409, "Candidate not found");

    return findCandidate;
  }

  public async create(candidateData: CreateCandidateDto): Promise<Candidate> {
    const findCandidate: Candidate | null = await this.candidates.findUnique({
      where: { email: candidateData.email },
    });

    if (findCandidate) throw new HttpException(409, "Candidate already exists");

    const hashedPassword = await hash(candidateData.password, 10);
    const createCandidateData: Candidate = await this.candidates.create({
      data: {
        ...candidateData,
        password: hashedPassword,
      },
    });

    return createCandidateData;
  }

  public async update(candidateId: string, candidateData: CreateCandidateDto): Promise<Candidate> {
    const findCandidate: Candidate | null = await this.candidates.findUnique({
      where: { id: candidateId },
    });

    if (!findCandidate) throw new HttpException(409, "Candidate not found");

    const hashedPassword = await hash(candidateData.password, 10);
    const updateCandidateData: Candidate = await this.candidates.update({
      where: { id: candidateId },
      data: {
        ...candidateData,
        password: hashedPassword,
      },
    });

    return updateCandidateData;
  }

  public async delete(candidateId: string): Promise<Candidate> {
    const findCandidate: Candidate | null = await this.candidates.findUnique({
      where: { id: candidateId },
    });

    if (!findCandidate) throw new HttpException(409, "Candidate not found");

    const deleteCandidateData: Candidate = await this.candidates.delete({
      where: { id: candidateId },
    });

    return deleteCandidateData;
  }
}

export default CandidateService;
