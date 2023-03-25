import express from "express";
import userController from "../controllers/user.js";

const user = (app) => {
  const router = express.Router();
  app.use("/api/user", router);
  router.post("/signUp", userController.signUp);
  router.post("/register", userController.register);
  router.post("/changePassword", userController.changePassword);
};

export default user;
