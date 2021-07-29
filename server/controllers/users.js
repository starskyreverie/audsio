import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export const login = async (req, res) => {
  // login the user
  if (!req.body.usernameOrEmail) {
    return res
      .status(400)
      .json({ errorMessage: "You must provide a username or email." });
  }
  if (!req.body.password) {
    return res
      .status(400)
      .json({ errorMessage: "You must provide a password." });
  }
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
  if (!req.body.username) {
    return res
      .status(400)
      .json({ errorMessage: "You must provide a username." });
  }

  if (!req.body.email) {
    return res.status(400).json({ errorMessage: "You must provide a email." });
  }

  if (!req.body.password) {
    return res
      .status(400)
      .json({ errorMessage: "You must provide a password." });
  }

  if (!req.body.confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "You must fill in the confirm password field." });
  }

  if (req.body.username.length < 2 || req.body.username.length > 12) {
    return res.status(400).json({
      errorMessage: "Your username must be between 2 and 12 characters.",
    });
  }

  if (req.body.username.includes("@")) {
    return res
      .status(400)
      .json({ errorMessage: "Your username may not contain the '@' symbol." });
  }

  if (req.body.username.includes(" ")) {
    return res
      .status(400)
      .json({ errorMessage: "Your username may not contain any spaces." });
  }

  if (
    !req.body.email.includes("@") ||
    !req.body.email.includes(".") ||
    req.body.email.length < 6
  ) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid email." });
  }

  if (req.body.password.length < 2 || req.body.password.length > 40) {
    return res.status(400).json({
      errorMessage: "Your password must be between 2 and 40 characters.",
    });
  }

  if (req.body.confirmPassword.length > 40) {
    return res.status(400).json({
      errorMessage:
        "The confirm password field must have less than 40 characters.",
    });
  }

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

export const getUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ errorMessage: "That user doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong." });
  }
};
