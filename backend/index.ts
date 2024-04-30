import express, { Express, Request, Response } from "express";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";

const app: Express = express();
const port = 8800;

app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server11 is running at <https://localhost>:${port}`);
});
