import App from "./app";
import AuthRoute from "./routers/auth.route";
import IndexRoute from "./routers/index.route";

const app = new App([new IndexRoute(), new AuthRoute()]);

app.listen();
