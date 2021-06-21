import express from "express";
const router = express.Router();
import multer from "multer";

import { getPosts, createPost } from "../controllers/posts.js";

const upload = multer();

router.get("/", getPosts);
router.post("/", upload.single("file"), createPost);

export default router;
