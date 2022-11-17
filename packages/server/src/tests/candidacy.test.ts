import { NextFunction, Request, Response } from "express";
import request from "supertest";
import App from "../app";
import CandidacyRoute from "../routers/candidacy.route";

const user = {
  id: "1",
  name: "Company",
  email: "teste@teste.com",
  password: "123456",
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

    next({ ...user, id: userId, type: ["1", "2", "3"].includes(userId) ? "CANDIDATE" : "COMPANY" });
  },
}));

describe("testing candidacy", () => {
  describe("[GET] /candidacies/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;
      const mockCandidacy = {
        id: "1",
        candidateId: "1",
        vacancyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        candidate: {
          id: "1",
          name: "Candidate 1",
          email: "candidate@email.com",
          password: "123456",
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vacancy: {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "3",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
      };

      jest.spyOn(candidacies, "findUnique").mockImplementation().mockResolvedValue(mockCandidacy);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer()).get(`${candidaciesRoute.path}/1`).set("Authorization", "Bearer 1");

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe("1");
      expect(res.body.data.candidate.name).toBe("Candidate 1");
      expect(res.body.data.vacancy.title).toBe("Vacancy 1");
    });

    it("should return 403 Forbidden", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;

      const mockCandidacy = {
        id: "1",
        candidateId: "1",
        vacancyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        candidate: {
          id: "1",
          name: "Candidate 1",
          email: "candidate@email.com",
          password: "123456",
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vacancy: {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "5",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
      };

      jest.spyOn(candidacies, "findUnique").mockImplementation().mockResolvedValue(mockCandidacy);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer()).get(`${candidaciesRoute.path}/1`).set("Authorization", "Bearer 7");

      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Forbidden");
    });

    it("should return 404 Not Found", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;

      jest.spyOn(candidacies, "findUnique").mockImplementation().mockResolvedValue(null);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer()).get(`${candidaciesRoute.path}/1`).set("Authorization", "Bearer 1");

      expect(res.status).toBe(404);
    });
  });

  describe("[POST] /candidacies", () => {
    it("should return 201 Created", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;

      const mockCandidacy = {
        id: "1",
        candidateId: "1",
        vacancyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        candidate: {
          id: "1",
          name: "Candidate 1",
          email: "candidate@test.com",
          password: "123456",
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vacancy: {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "3",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
      };

      jest.spyOn(candidacies, "create").mockImplementation().mockResolvedValue(mockCandidacy);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer())
        .post(`/vacancies/:vacancyId${candidaciesRoute.path}`)
        .set("Authorization", "Bearer 1");

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBe("1");
    });

    it("should return 403 Forbidden for company user", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer())
        .post(`/vacancies/:vacancyId${candidaciesRoute.path}`)
        .set("Authorization", "Bearer 9");

      expect(res.status).toBe(403);
    });
  });

  describe("[DELETE] /candidacies/:id", () => {
    it("should return 204 No Content", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;

      const mockCandidacy = {
        id: "1",
        candidateId: "1",
        vacancyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        candidate: {
          id: "1",
          name: "Candidate 1",
          email: "candidate@test.com",
          password: "123456",
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vacancy: {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "3",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
      };

      jest.spyOn(candidacies, "findUnique").mockImplementation().mockResolvedValue(mockCandidacy);
      jest.spyOn(candidacies, "delete").mockImplementation().mockResolvedValue(mockCandidacy);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer()).delete(`${candidaciesRoute.path}/1`).set("Authorization", "Bearer 1");

      expect(res.status).toBe(204);
    });

    it("should return 403 Forbidden", async () => {
      expect.hasAssertions();
      const candidaciesRoute = new CandidacyRoute();
      const { candidacies } = candidaciesRoute.candidacyController.candidacyService;

      const mockCandidacy = {
        id: "1",
        candidateId: "1",
        vacancyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        candidate: {
          id: "1",
          name: "Candidate 1",
          email: "candidate@test.com",
          password: "123456",
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vacancy: {
          id: "1",
          title: "Vacancy 1",
          description: "Description 1",
          companyId: "3",
          experienceLevel: "JUNIOR",
          workLoad: "FULLTIME",
          workRegime: "CLT",
          workType: "REMOTE",
          createdAt: new Date(),
          updatedAt: new Date(),
          salary: null,
        },
      };

      jest.spyOn(candidacies, "findUnique").mockImplementation().mockResolvedValue(mockCandidacy);
      jest.spyOn(candidacies, "delete").mockImplementation().mockResolvedValue(mockCandidacy);

      const app = new App([candidaciesRoute]);
      const res = await request(app.getServer()).delete(`${candidaciesRoute.path}/1`).set("Authorization", "Bearer 2");

      expect(res.status).toBe(403);
    });
  });
});
