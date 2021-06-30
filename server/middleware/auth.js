// check if user is authorized

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
  // no authorization headers? instadecline, not a trusted request source
  if (!req.headers.authorization) {
    return res.status(401).json({ errorMessage: "Unauthorized." });
  }

  try {
    // req.headers.authorization is "Bearer [token]", so this gets the string for the token
    const token = req.headers.authorization.split(" ")[1];
    // make sure it isn't some other kind of authorization
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //verify the token and add a userId variable to the request object
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default auth;
