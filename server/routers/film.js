import express from "express";
import filmController from "../controllers/film.js";

const film = (app) => {
    const router = express.Router();
    app.use("/api/film", router);
    router.get("/getFilm", filmController.getFilm);
    router.get("/getFilm/:name", filmController.getFilmByName);
    router.post("/addFilm", filmController.addFilm);
}

export default film;