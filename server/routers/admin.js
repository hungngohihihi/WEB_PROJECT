import express from "express";
import adminController from "../controllers/admin.js";

const admin = (app) => {
  const router = express.Router();
  app.use("/api/admin", router);
  router.post("/login", adminController.login);
  router.get("/autoUpdateFilm/:passwordUpdate", adminController.autoUpdateFilm);
};

export default admin;
