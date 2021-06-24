import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

export const login = async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;

  const isUsername = !(
    usernameOrEmail.includes("@") && usernameOrEmail.includes(".")
  );
  const isEmail = !isUsername;

  try {
    let existingUser = null;

    if (isUsername) {
      existingUser = await User.findOne({ username: usernameOrEmail });
    } else if (isEmail) {
      existingUser = await User.findOne({ email: usernameOrEmail });
    }

    if (!existingUser && isUsername) {
      return res.status(403).json({
        errorMessage: "The provided username does not exist.",
        field: "usernameOrEmail",
      });
    }
    if (!existingUser && isEmail) {
      return res.status(403).json({
        errorMessage: "The provided email does not exist.",
        field: "usernameOrEmail",
      });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res.status(401).json({
        errorMessage: "The provided password is incorrect.",
        field: "password",
      });
    }

    const token = jwt.sign(
      {
        username: existingUser.username,
        email: existingUser.email,
        _id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (e) {
    res.status(500).json({ errorMessage: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail) {
      return res.status(400).json({
        errorMessage: "The provided email already exists.",
        field: "email",
      });
    }
    const existingUserUsername = await User.findOne({ username: username });
    if (existingUserUsername) {
      return res.status(400).json({
        errorMessage: "The provided username already exists.",
        field: "username",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        errorMessage: "The providied passwords don't match.",
        field: "confirmPassword",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        username: result.username,
        email: result.email,
        _id: result._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ result, token });
  } catch (e) {
    res.status(500).json({ errorMessage: "Something went wrong." });
  }
};
