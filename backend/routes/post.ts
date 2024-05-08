import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/:id", verifyToken, addPost);
postRouter.put("/:id", verifyToken, updatePost);
postRouter.delete("/:id", verifyToken, deletePost);

export default postRouter;
