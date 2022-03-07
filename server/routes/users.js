import express from "express";
import { login, signup, getUser, getUsers } from "../controllers/users.js";

// run controllers on HTTP requests to routes

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/all", getUsers);
router.get("/:username", getUser);

export default router;
