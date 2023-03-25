import express from "express";
import cors from "cors";
import user from "./routers/user.js";
import admin from "./routers/admin.js";
import * as dotenv from "dotenv";

import film from "./routers/film.js";
import episodeFilm from "./routers/episodeFilm.js";
import comment from "./routers/comment.js";
import rate from "./routers/rate.js";
import session from "express-session";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(session({secret:"04112002", resave: false, saveUninitialized: true}))
app.use(cors());

user(app);
admin(app);
film(app);
episodeFilm(app);
comment(app);
rate(app);

app.listen(port, () => {
  console.log("Server started on port 4000");
});
