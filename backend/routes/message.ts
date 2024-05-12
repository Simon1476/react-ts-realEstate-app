import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addMessage } from "../controllers/message";

const messageRouter = express.Router();

messageRouter.post("/:chatId", verifyToken, addMessage);

export default messageRouter;
