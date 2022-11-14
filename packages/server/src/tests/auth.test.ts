import { hash } from "bcrypt";
import request from "supertest";
import { Candidate, Company } from "@prisma/client";
import AuthRoute from "../routers/auth.route";
import App from "../app";
import CredentialDto from "../dtos/credentials.dto";

describe("testing Auth", () => {
  describe("[POST] /auth/candidate/login", () => {
    it("should return 200 ok and a token", async () => {
      expect.hasAssertions();
      const user: Candidate = {
        name: "John Doe",
        email: "test@email.com",
        password: "test",
        type: "CANDIDATE",
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userCredentials: CredentialDto = {
        email: user.email,
        password: user.password,
      };

      const authRoute = new AuthRoute();
      const candidates = authRoute.authController.authService.userServices.candidate;

      jest
        .spyOn(candidates, "findByEmail")
        .mockImplementation()
        .mockResolvedValue({ ...user, password: await hash(user.password, 10) });

      const app = new App([authRoute]);
      const res = await request(app.getServer()).post(`${authRoute.path}/candidate/login`).send(userCredentials);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
    });

    it("should return 401 unauthorized", async () => {
      expect.hasAssertions();

      const userCredentials: CredentialDto = {
        email: "test@email.com",
        password: "error",
      };

      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      const res = await request(app.getServer()).post(`${authRoute.path}/candidate/login`).send(userCredentials);
      expect(res.status).toBe(401);
    });
  });

  describe("[POST] /auth/company/login", () => {
    it("should return 200 ok and a token", async () => {
      expect.hasAssertions();
      const user: Company = {
        name: "Some Company",
        email: "company@email.com",
        password: "company123",
        type: "COMPANY",
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userCredentials: CredentialDto = {
        email: user.email,
        password: user.password,
      };

      const authRoute = new AuthRoute();
      const companies = authRoute.authController.authService.userServices.company;

      jest
        .spyOn(companies, "findByEmail")
        .mockImplementation()
        .mockResolvedValue({
          ...user,
          password: await hash(user.password, 10),
        });

      const app = new App([authRoute]);
      const res = await request(app.getServer()).post(`${authRoute.path}/company/login`).send(userCredentials);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
    });

    it("should return 401 unauthorized", async () => {
      expect.hasAssertions();

      const userCredentials: CredentialDto = {
        email: "error@gmail.com",
        password: "error",
      };

      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      const res = await request(app.getServer()).post(`${authRoute.path}/company/login`).send(userCredentials);
      expect(res.status).toBe(401);
    });
  });
});
