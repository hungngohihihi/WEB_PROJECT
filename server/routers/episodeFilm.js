import express from "express";
import episodeFilmController from "../controllers/episodeFilm.js";

const episodeFilm = (app) => {
    const router = express.Router();
    app.use("/api/episodeFilm", router);
    router.get("/getEpisodeFilm", episodeFilmController.getEpisodeFilm);
    router.get("/getEpisodeFilm/:filmID", episodeFilmController.getEpisodeFilmById);
    router.get("/getUrlEpisodeFilm/:filmID", episodeFilmController.getEpisodeFilmByEpisodeId);
    router.post("/addEpisode", episodeFilmController.addEpisode);
}

export default episodeFilm;