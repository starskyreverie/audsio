import express from "express";
const router = express.Router();
import multer from "multer";

import { getPosts, createPost } from "../controllers/posts.js";

const upload = multer();

router.get("/", getPosts);
router.post("/", upload.single("file"), createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
