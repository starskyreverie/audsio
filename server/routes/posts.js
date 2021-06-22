import express from "express";
const router = express.Router();
import multer from "multer";

import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const upload = multer();

router.get("/", getPosts);
router.post("/", upload.single("file"), createPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.patch("/:id/:value/likePost", likePost);

export default router;
