import express from "express";
import adminController from "../controllers/admin.js";
import verifyToken from "../middleware/auth.js";
const admin = (app) => {
  const router = express.Router();
  app.use("/api/admin", router);
  router.post("/deleteFilmByFilmID", adminController.deleteFilmByFilmID);
  router.post("/login", adminController.login);
  router.get("/autoUpdateFilm/:passwordUpdate", verifyToken, adminController.autoUpdateFilm);
  router.get("/listAdminAccount", verifyToken, adminController.listAdminAccount);
  router.get("/listUserAccount", verifyToken, adminController.listUserAccount);
};

export default admin;
