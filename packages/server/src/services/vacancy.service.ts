import { Company, Prisma, PrismaClient, Vacancy } from "@prisma/client";
import CreateVacancyDto from "../dtos/vacancy.dto";
import HttpException from "../exceptions/HttpException";

type VacancyIncludes = Prisma.VacancyInclude;

class VacancyService {
  public vacancies = new PrismaClient().vacancy;

  public async findAll(includes?: VacancyIncludes): Promise<Vacancy[]> {
    const allVacancies: Vacancy[] = await this.vacancies.findMany({
      include: includes,
      orderBy: {
        createdAt: "desc",
      },
    });

    return allVacancies;
  }

  public async findById(vacancyID: string, includes?: VacancyIncludes): Promise<Vacancy> {
    const vacancy = await this.vacancies.findUnique({
      where: { id: vacancyID },
      include: includes,
    });

    if (!vacancy) throw new HttpException(409, "Vacancy doesn't exist");

    return vacancy;
  }

  public async findByCompany(companyID: string, includes?: VacancyIncludes): Promise<Vacancy[]> {
    const vacancies = await this.vacancies.findMany({
      where: { companyId: companyID },
      include: includes,
    });

    if (!vacancies) throw new HttpException(404, "Vacancies or Company doesn't exist");

    return vacancies;
  }

  public async create(vacancyData: CreateVacancyDto, company: Company, includes?: VacancyIncludes): Promise<Vacancy> {
    const vacancy = await this.vacancies.create({
      data: {
        ...vacancyData,
        company: {
          connect: {
            id: company.id,
          },
        },
      },
      include: includes,
    });

    return vacancy;
  }

  public async update(vacancyID: string, vacancyData: CreateVacancyDto, includes?: VacancyIncludes): Promise<Vacancy> {
    const vacancy = await this.vacancies.update({
      where: { id: vacancyID },
      data: { ...vacancyData },
      include: includes,
    });

    if (!vacancy) throw new HttpException(404, "Vacancy doesn't exist");

    return vacancy;
  }

  public async delete(vacancyID: string): Promise<Vacancy> {
    const vacancy = await this.vacancies.delete({
      where: { id: vacancyID },
    });

    if (!vacancy) throw new HttpException(409, "Vacancy doesn't exist");

    return vacancy;
  }
}

export default VacancyService;
