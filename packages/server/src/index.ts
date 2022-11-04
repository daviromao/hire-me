import App from "./app";
import IndexRoute from "./routers/index.route";

const app = new App([new IndexRoute()]);

app.listen();
