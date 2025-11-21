import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const path = "/api";

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.use(path, authRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server started on ${PORT} port...`);
});
