import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../model/userModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { generateJWTs } from "../utility/jwtHelper.js";

const userRouter = express.Router();

// Create user | Signup Endpoint

userRouter.post("/", async (req, res) => {
  try {
    // hash Password before saving

    const { password } = req.body;

    const hashedPassword = hashPassword(password);

    // Query the Database

    const result = await createUser({ ...req.body, password: hashedPassword });

    result?._id
      ? buildSuccessResponse(res, result, "User created Successfully!!")
      : buildErrorResponse(res, "Could not create user!!");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists!!";
    }
    buildErrorResponse(res, error.message);
  }
});

// Login the user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user with email
    const user = await findUserByEmail(email);

    if (user?._id) {
      // compare the password
      const isPasswordMatched = comparePassword(password, user.password);
      const jwt = generateJWTs(email);

      isPasswordMatched
        ? buildSuccessResponse(res, jwt, "Logged in successfully")
        : buildErrorResponse(res, "Invalid Credentials!");

      return;
    }

    buildErrorResponse(res, "Invalid Credentials!");
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials!");
  }
});
export default userRouter;
