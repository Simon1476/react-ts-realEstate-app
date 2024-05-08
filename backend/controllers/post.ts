import { RequestHandler } from "express";
import prisma from "../lib/prisma";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts." });
  }
};

export const getPost: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post." });
  }
};

export const addPost: RequestHandler = async (req, res, next) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

export const updatePost: RequestHandler = async (req, res, next) => {
  const posts = prisma.post.findMany();

  try {
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post." });
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post) {
      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
      }
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};
