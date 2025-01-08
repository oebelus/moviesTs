import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Human from "./models/Human.js";
import Watched from "./models/Watched.js";
import Watchlist from "./models/Watchlist.js";
import Top from "./models/Top.js";
dotenv.config();

console.log(process.env.DB_NAME);

const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: "localhost",
  dialect: "mysql",
  logging: false,
  models: [Human, Watched, Watchlist, Top],
});

export default connection;
