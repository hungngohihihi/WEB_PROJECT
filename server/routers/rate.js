import express from "express";
import rateController from "../controllers/rate.js";

const rate = (app) => {
    const router = express.Router();
    app.use("/api/rate", router);
    router.post("/", rateController.rateFilm);
}

export default rate;