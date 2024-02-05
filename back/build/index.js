import express from 'express';
import bodyParser from "body-parser";
import usersRoutes from "./routes/Login.js";
import watchedRoutes from "./routes/Watched.js";
import watchlistRoutes from "./routes/Watchlist.js";
import topRoutes from "./routes/Top.js";
import dotenv from 'dotenv';
import connection from "./database/connection.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", usersRoutes);
app.use("/watched", watchedRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/top", topRoutes);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
connection
    .sync()
    .then(() => {
    console.log("Database synced successfully");
})
    .catch((err) => {
    console.log("Err", err);
});
app.listen(8000);
//# sourceMappingURL=index.js.map