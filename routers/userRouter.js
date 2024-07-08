import express from "express";

const userRouter = express.Router();

// Create user | Signup Endpoint

userRouter.post("/", async (req, res) => {
  try {
    // hash Password before saving
  } catch (error) {}
});

export default userRouter;
