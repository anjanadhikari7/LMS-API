import "dotenv/config";
import express from "express";

import cors from "cors";
import { connectToMongoDb } from "./config/dbConfig.js";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouters.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware

app.use(cors());

app.use(express.json());

//Connect to DB
connectToMongoDb();

//Routers

app.use("/api/user", userRouter);

app.use("/api/book", bookRouter);

// Start server

app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is Running");
});
