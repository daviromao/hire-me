import CompanyService from "../services/company.service";
import CandidateService from "../services/candidate.service";
import { UserService } from "../interfaces/user-services.interface";

module AuthConfig {
  export const userServices = {
    company: new CompanyService() as UserService,
    candidate: new CandidateService() as UserService,
  };

  export type UserTypes = keyof typeof userServices;
}

export default AuthConfig;
