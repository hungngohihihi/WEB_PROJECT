import express from "express";
import commentController from "../controllers/comment.js";

const comment = (app) => {
    const router = express.Router();
    app.use("/api/comment", router);
    router.post("/", commentController.addComment);
    router.get("/", commentController.getComment);
}

export default comment;