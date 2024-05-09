import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";
import { upload } from "../lib/bucket";

const postRouter = express.Router();

// // postRouter.post("/upload",  verifyToken, upload.array('photos', 12), async (req, res) => {

// } )
postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", verifyToken, addPost);
postRouter.put("/:id", verifyToken, updatePost);
postRouter.delete("/:id", verifyToken, deletePost);

export default postRouter;
