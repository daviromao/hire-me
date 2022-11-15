import { Company } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import App from "../app";
import AuthConfig from "../configs/auth.config";
import CreateCompanyDto from "../dtos/companies.dto";
import CompanyRoute from "../routers/company.route";
import AuthService from "../services/auth.service";

describe("testing companies", () => {
  describe("[GET] /companies", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const companiesRoute = new CompanyRoute();
      const { companies } = companiesRoute.companyController.companyService;
      const mockCompanies: Company[] = [
        {
          id: "1",
          name: "Company 1",
          email: "company@email.com",
          password: await hash("teste1", 10),
          type: "COMPANY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Company 2",
          email: "company2@email.com",
          password: await hash("teste2", 10),
          type: "COMPANY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(companies, "findMany").mockImplementation().mockResolvedValue(mockCompanies);

      const app = new App([companiesRoute]);
      const res = await request(app.getServer()).get(`${companiesRoute.path}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].name).toBe("Company 1");
      expect(res.body.data[1].name).toBe("Company 2");
    });
  });

  describe("[GET] /companies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const companiesRoute = new CompanyRoute();
      const { companies } = companiesRoute.companyController.companyService;
      const mockCompany: Company = {
        id: "1",
        name: "Company 1",
        email: "email@test.com",
        password: await hash("teste1", 10),
        type: "COMPANY",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(companies, "findUnique").mockImplementation().mockResolvedValue(mockCompany);

      const app = new App([companiesRoute]);
      const res = await request(app.getServer()).get(`${companiesRoute.path}/1`);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Company 1");
      expect(res.body.data.id).toBe("1");
    });
  });

  describe("[POST] /companies", () => {
    it("should return 201 OK", async () => {
      expect.hasAssertions();
      const companiesRoute = new CompanyRoute();
      const { companies } = companiesRoute.companyController.companyService;

      const companyData: CreateCompanyDto = {
        name: "Company 1",
        email: "test@email.com",
        password: "teste1",
      };

      const mockCompany: Company = {
        id: "1fd",
        ...companyData,
        password: await hash(companyData.password, 10),
        type: "COMPANY",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(companies, "findUnique").mockImplementation().mockResolvedValue(null);
      jest.spyOn(companies, "create").mockImplementation().mockResolvedValue(mockCompany);

      const app = new App([companiesRoute]);
      const res = await request(app.getServer()).post(`${companiesRoute.path}`).send(mockCompany);

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Company 1");
      expect(res.body.data.id).toBe("1fd");
    });
  });

  describe("[PUT] /companies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const companiesRoute = new CompanyRoute();
      const { companies } = companiesRoute.companyController.companyService;
      AuthConfig.userServices.company = companiesRoute.companyController.companyService;

      const companyData: CreateCompanyDto = {
        name: "Teste User",
        email: "test@email.com",
        password: "teste1",
      };

      const mockCompany: Company = {
        id: "1fd",
        ...companyData,
        password: await hash(companyData.password, 10),
        type: "COMPANY",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(companies, "findUnique").mockImplementation().mockResolvedValue(mockCompany);
      jest
        .spyOn(companies, "update")
        .mockImplementation()
        .mockResolvedValue({ ...mockCompany, name: "User Updated" });

      const token = new AuthService().createToken(mockCompany, "company");

      const app = new App([companiesRoute]);
      const res = await request(app.getServer())
        .put(`${companiesRoute.path}/1fd`)
        .set("Authorization", `Bearer ${token}`)
        .send(mockCompany);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("User Updated");
      expect(res.body.data.id).toBe("1fd");
    });
  });

  describe("[DELETE] /companies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const companiesRoute = new CompanyRoute();
      const { companies } = companiesRoute.companyController.companyService;
      AuthConfig.userServices.company = companiesRoute.companyController.companyService;

      const companyData: Company = {
        name: "Teste User",
        email: "email@example.com",
        password: "teste1",
        id: "1fd",
        type: "COMPANY",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(companies, "findUnique").mockImplementation().mockResolvedValue(companyData);
      jest.spyOn(companies, "delete").mockImplementation().mockResolvedValue(companyData);

      const token = new AuthService().createToken(companyData, "company");

      const app = new App([companiesRoute]);
      const res = await request(app.getServer())
        .delete(`${companiesRoute.path}/1fd`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
      expect(res.body).toStrictEqual({});
    });
  });
});
