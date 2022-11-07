import { hash } from "bcrypt";
import { PrismaClient, Company } from "@prisma/client";
import CreateCompanyDto from "../dtos/companies.dto";
import HttpException from "../exceptions/HttpException";

class CompanyService {
  public companies = new PrismaClient().company;

  public async findAll(): Promise<Company[]> {
    const allCompanies: Company[] = await this.companies.findMany();

    return allCompanies;
  }

  public async findById(companyID: string): Promise<Company> {
    const findCompany: Company | null = await this.companies.findUnique({
      where: { id: companyID },
    });

    if (!findCompany) throw new HttpException(409, "Company doesn't exist");

    return findCompany;
  }

  public async findByEmail(companyEmail: string): Promise<Company> {
    const findCompany: Company | null = await this.companies.findUnique({
      where: { email: companyEmail },
    });

    if (!findCompany) throw new HttpException(409, "Company not found");

    return findCompany;
  }

  public async create(companyData: CreateCompanyDto): Promise<Company> {
    const findCompany: Company | null = await this.companies.findUnique({
      where: { email: companyData.email },
    });

    if (findCompany) throw new HttpException(409, "Company already exists");

    const hashedPassword = await hash(companyData.password, 10);
    const createCompanyData: Company = await this.companies.create({
      data: {
        ...companyData,
        password: hashedPassword,
      },
    });

    return createCompanyData;
  }

  public async update(
    companyId: string,
    companyData: CreateCompanyDto,
  ): Promise<Company> {
    const findCompany: Company | null = await this.companies.findUnique({
      where: { id: companyId },
    });

    if (!findCompany) throw new HttpException(409, "Company not found");

    const hashedPassword = await hash(companyData.password, 10);
    const updateCompanyData: Company = await this.companies.update({
      where: { id: companyId },
      data: {
        ...companyData,
        password: hashedPassword,
      },
    });

    return updateCompanyData;
  }

  public async delete(companyId: string): Promise<Company> {
    const findCompany: Company | null = await this.companies.findUnique({
      where: { id: companyId },
    });

    if (!findCompany) throw new HttpException(409, "Company not found");

    const deleteCompanyData: Company = await this.companies.delete({
      where: { id: companyId },
    });

    return deleteCompanyData;
  }
}

export default CompanyService;
