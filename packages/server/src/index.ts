import App from "./app";
import AuthRoute from "./routers/auth.route";
import CandidacyRoute from "./routers/candidacy.route";
import CandidateRoute from "./routers/candidate.route";
import CompanyRoute from "./routers/company.route";
import IndexRoute from "./routers/index.route";
import VacancyRoute from "./routers/vacancy.route";

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new CandidateRoute(),
  new CompanyRoute(),
  new VacancyRoute(),
  new CandidacyRoute(),
]);

app.listen();
