import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";

dotenv.config();
const app: Express = express();
const port = 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
