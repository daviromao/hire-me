import { Candidate } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import App from "../app";
import AuthConfig from "../configs/auth.config";
import CreateCandidateDto from "../dtos/candidates.dto";
import CandidateRoute from "../routers/candidate.route";
import AuthService from "../services/auth.service";

describe("testing Candidates", () => {
  describe("[GET] /candidates", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const candidatesRoute = new CandidateRoute();
      const { candidates } = candidatesRoute.candidateController.candidateService;
      const mockCandidates: Candidate[] = [
        {
          id: "1",
          name: "John Doe",
          email: "a@email.com",
          password: await hash("teste1", 10),
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "John Doe 2",
          email: "b@email.com",
          password: await hash("teste2", 10),
          type: "CANDIDATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(candidates, "findMany").mockImplementation().mockResolvedValue(mockCandidates);

      const app = new App([candidatesRoute]);
      const res = await request(app.getServer()).get(`${candidatesRoute.path}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].name).toBe("John Doe");
      expect(res.body.data[1].name).toBe("John Doe 2");
    });
  });

  describe("[GET] /candidates/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const candidatesRoute = new CandidateRoute();
      const { candidates } = candidatesRoute.candidateController.candidateService;
      const mockCandidate: Candidate = {
        id: "1",
        name: "John Doe",
        email: "email@test.com",
        password: await hash("teste1", 10),
        type: "CANDIDATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(candidates, "findUnique").mockImplementation().mockResolvedValue(mockCandidate);

      const app = new App([candidatesRoute]);
      const res = await request(app.getServer()).get(`${candidatesRoute.path}/1`);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("John Doe");
      expect(res.body.data.id).toBe("1");
    });
  });

  describe("[POST] /candidates", () => {
    it("should return 201 CREATED", async () => {
      expect.hasAssertions();
      const candidatesRoute = new CandidateRoute();
      const { candidates } = candidatesRoute.candidateController.candidateService;
      const candidateData: CreateCandidateDto = {
        name: "Teste User",
        email: "test@email.com",
        password: "teste1",
      };

      const mockCandidate: Candidate = {
        id: "1fd",
        ...candidateData,
        password: await hash(candidateData.password, 10),
        type: "CANDIDATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(candidates, "findUnique").mockImplementation().mockResolvedValue(null);
      jest.spyOn(candidates, "create").mockImplementation().mockResolvedValue(mockCandidate);

      const app = new App([candidatesRoute]);
      const res = await request(app.getServer()).post(`${candidatesRoute.path}`).send(candidateData);

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Teste User");
      expect(res.body.data.id).toBe("1fd");
    });
  });

  describe("[PUT] /candidates/:id", () => {
    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const candidatesRoute = new CandidateRoute();

      const { candidates } = candidatesRoute.candidateController.candidateService;
      AuthConfig.userServices.candidate = candidatesRoute.candidateController.candidateService;

      const candidateData: CreateCandidateDto = {
        name: "Teste User",
        email: "test@email.com",
        password: "teste1",
      };

      const mockCandidate: Candidate = {
        id: "1fd",
        ...candidateData,
        password: await hash(candidateData.password, 10),
        type: "CANDIDATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = new AuthService().createToken(mockCandidate, "candidate");

      jest.spyOn(candidates, "findUnique").mockImplementation().mockResolvedValue(mockCandidate);
      jest
        .spyOn(candidates, "update")
        .mockImplementation()
        .mockResolvedValue({ ...mockCandidate, name: "Teste User 2" });

      const app = new App([candidatesRoute]);
      const res = await request(app.getServer())
        .put(`${candidatesRoute.path}/1fd`)
        .set("Authorization", `Bearer ${token}`)
        .send(candidateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Teste User 2");
      expect(res.body.data.id).toBe("1fd");
    });
  });

  describe("[DELETE] /candidates/:id", () => {
    const candidateData: CreateCandidateDto = {
      name: "Teste User",
      email: "test@email.com",
      password: "teste1",
    };

    it("should return 200 OK", async () => {
      expect.hasAssertions();
      const candidatesRoute = new CandidateRoute();

      const { candidates } = candidatesRoute.candidateController.candidateService;
      AuthConfig.userServices.candidate = candidatesRoute.candidateController.candidateService;

      const mockCandidate: Candidate = {
        id: "1fd",
        ...candidateData,
        password: await hash(candidateData.password, 10),
        type: "CANDIDATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = new AuthService().createToken(mockCandidate, "candidate");

      jest.spyOn(candidates, "findUnique").mockImplementation().mockResolvedValue(mockCandidate);

      jest.spyOn(candidates, "delete").mockImplementation().mockResolvedValue(mockCandidate);

      const app = new App([candidatesRoute]);
      const res = await request(app.getServer())
        .delete(`${candidatesRoute.path}/1fd`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
      expect(res.body).toStrictEqual({});
    });
  });
});
