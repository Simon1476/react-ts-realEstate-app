import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
const port = 8800;

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server11 is running at <https://localhost>:${port}`);
});
