import express from "express";
import { login, signup } from "../controllers/users.js";

// run controllers on HTTP requests to routes

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
