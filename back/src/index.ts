import App from "./app";
import HumanController from "./resources/controllers/human.controller";
import TopController from "./resources/controllers/top.controller";
import WatchedController from "./resources/controllers/watched.controller";
import WatchlistController from "./resources/controllers/watchlist.controller";

const app = new App(
  [
    new HumanController(),
    new WatchedController(),
    new WatchlistController(),
    new TopController(),
  ],
  Number(process.env.PORT)
);

app.listen();
