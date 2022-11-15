import { NextFunction, Response, Request } from "express";
import { Company, Prisma, Vacancy } from "@prisma/client";
import request from "supertest";
import App from "../app";
import CreateVacancyDto from "../dtos/vacancy.dto";
import VacancyRoute from "../routers/vacancy.route";

const company: Company = {
  id: "1",
  name: "Company",
  email: "teste@teste.com",
  password: "123456",
  type: "COMPANY",
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock("../middlewares/auth.middleware", () => ({
  authMiddleware: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header("Authorization")?.replace("Bearer ", "");

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    next({ ...company, id: userId });
  },
}));

describe("testing vacancies", () => {
  describe("[GET] /vacancies", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;
      const mockVacancies: Vacancy[] = [
        {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "1",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
        {
          id: "1",
          title: "Vacancy 2",
          description: "Description 2",
          companyId: "2",
          experienceLevel: "SENIOR",
          workLoad: "PARTTIME",
          workRegime: "PJ",
          workType: "IN_PERSION",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: new Prisma.Decimal("1000.01"),
        },
      ];

      jest.spyOn(vacancies, "findMany").mockImplementation().mockResolvedValue(mockVacancies);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer()).get(`${vacanciesRoute.path}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].title).toBe("Vacancy 1");
      expect(res.body.data[1].title).toBe("Vacancy 2");
      expect(res.body.data[1].salary).toBe("1000.01");
    });
  });

  describe("[GET] /vacancies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;
      const mockVacancy: Vacancy = {
        id: "1",
        title: "Vacancy 1",
        description: "Description 1",
        companyId: "1",
        experienceLevel: "JUNIOR",
        workLoad: "FULLTIME",
        workRegime: "CLT",
        workType: "REMOTE",
        createdAt: new Date(),
        updatedAt: new Date(),
        salary: null,
      };

      jest.spyOn(vacancies, "findUnique").mockImplementation().mockResolvedValue(mockVacancy);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer()).get(`${vacanciesRoute.path}/1`);

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Vacancy 1");
      expect(res.body.data.salary).toBeNull();
    });
  });

  describe("[GET] /companies/:id/vacancies", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();

      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;
      const mockVacancies: Vacancy[] = [
        {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "1",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
        {
          id: "1",
          title: "Vacancy 2",
          description: "Description 2",
          companyId: "3",
          experienceLevel: "SENIOR",
          workLoad: "PARTTIME",
          workRegime: "PJ",
          workType: "IN_PERSION",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: new Prisma.Decimal("1000.01"),
        },
      ];

      jest.spyOn(vacancies, "findMany").mockImplementation().mockResolvedValue(mockVacancies);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer()).get(`/companies/3${vacanciesRoute.path}`);
      expect(res.status).toBe(200);
    });
  });

  describe("[POST] /vacancies", () => {
    it("should return 201 OK", async () => {
      expect.hasAssertions();

      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;

      const vacancyData: CreateVacancyDto = {
        title: "Vacancy 1",
        description: "Description 1",
        experienceLevel: "JUNIOR",
        workLoad: "FULLTIME",
        workRegime: "CLT",
        workType: "REMOTE",
      };

      const mockVacancy: Vacancy = {
        id: "1",
        ...vacancyData,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: company.id,
        salary: null,
      };

      jest.spyOn(vacancies, "create").mockImplementation().mockResolvedValue(mockVacancy);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer())
        .post(`${vacanciesRoute.path}`)
        .set("Authorization", `Bearer 1`)
        .send(mockVacancy);

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe("Vacancy 1");
      expect(res.body.data.salary).toBeNull();
    });
  });

  describe("[PUT] /vacancies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();

      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;

      const vacancyData: CreateVacancyDto = {
        title: "Vacancy 1",
        description: "Description 1",
        experienceLevel: "JUNIOR",
        workLoad: "FULLTIME",
        workRegime: "CLT",
        workType: "REMOTE",
      };

      const mockVacancy: Vacancy = {
        id: "1",
        ...vacancyData,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: company.id,
        salary: null,
      };

      jest.spyOn(vacancies, "update").mockImplementation().mockResolvedValue(mockVacancy);
      jest.spyOn(vacancies, "findUnique").mockImplementation().mockResolvedValue(mockVacancy);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer())
        .put(`${vacanciesRoute.path}/1`)
        .set("Authorization", "Bearer 1")
        .send(mockVacancy);

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Vacancy 1");
    });

    it("should return 403 FORBIDDEN", async () => {
      expect.hasAssertions();

      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;

      const vacancyData: CreateVacancyDto = {
        title: "Vacancy 1",
        description: "Description 1",
        experienceLevel: "JUNIOR",
        workLoad: "FULLTIME",
        workRegime: "CLT",
        workType: "REMOTE",
      };

      const mockVacancy: Vacancy = {
        id: "1",
        ...vacancyData,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: "2",
        salary: null,
      };

      jest.spyOn(vacancies, "update").mockImplementation().mockResolvedValue(mockVacancy);
      jest.spyOn(vacancies, "findUnique").mockImplementation().mockResolvedValue(mockVacancy);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer())
        .put(`${vacanciesRoute.path}/1`)
        .set("Authorization", "Bearer 1")
        .send(mockVacancy);

      expect(res.status).toBe(403);
    });
  });

  describe("[DELETE] /vacancies/:id", () => {
    it("should return 204 NO CONTENT", async () => {
      expect.hasAssertions();

      const vacanciesRoute = new VacancyRoute();
      const { vacancies } = vacanciesRoute.vacancyController.vacancyService;

      const vacancyData: CreateVacancyDto = {
        title: "Vacancy 1",
        description: "Description 1",
        experienceLevel: "JUNIOR",
        workLoad: "FULLTIME",
        workRegime: "CLT",
        workType: "REMOTE",
      };

      const mockVacancy: Vacancy = {
        id: "1",
        ...vacancyData,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: company.id,
        salary: null,
      };

      jest.spyOn(vacancies, "delete").mockImplementation().mockResolvedValue(mockVacancy);
      jest.spyOn(vacancies, "findUnique").mockImplementation().mockResolvedValue(mockVacancy);

      const app = new App([vacanciesRoute]);
      const res = await request(app.getServer()).delete(`${vacanciesRoute.path}/1`).set("Authorization", "Bearer 1");

      expect(res.status).toBe(204);
    });
  });
});
