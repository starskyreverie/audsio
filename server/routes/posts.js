import express from "express";
import multer from "multer";

import auth from "../middleware/auth.js";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const upload = multer();
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, upload.single("file"), createPost);
router.get("/:id", getPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
