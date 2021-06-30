import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export const login = async (req, res) => {
  // login the user
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;

  // check if a username or email was provided
  const isUsername = !(
    usernameOrEmail.includes("@") && usernameOrEmail.includes(".")
  );
  const isEmail = !isUsername;

  try {
    // find the user based on the username/email
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
    // verify the hashed password
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

    // send back a signed JWT on successful login
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
  // register the user
  const { username, email, password, confirmPassword } = req.body;
  try {
    // check for errors in the form
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

    // hash the password and store it
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // return the user along with a signed jwt
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
