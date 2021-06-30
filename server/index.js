import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// initialize express
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// initialize mongodb and run server
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((e) => console.log(e));

mongoose.set("useFindAndModify", false);
