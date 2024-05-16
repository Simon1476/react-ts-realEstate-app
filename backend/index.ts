import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import messageRouter from "./routes/message";
import chatRouter from "./routes/chat";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at <https://localhost>:${PORT}`);
});
