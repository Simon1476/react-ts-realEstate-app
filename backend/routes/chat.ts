import express from "express";
import { getChats, getChat, addChat, readChat } from "../controllers/chat";
import { verifyToken } from "../middleware/verifyToken";

const chatRouter = express.Router();

chatRouter.get("/", verifyToken, getChats);
chatRouter.get("/:id", verifyToken, getChat);
chatRouter.post("/", verifyToken, addChat);
chatRouter.put("/read/:id", verifyToken, readChat);

export default chatRouter;
