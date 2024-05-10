import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { CreatePost, Property, Type } from "../types/post";
import jwt from "jsonwebtoken";
export const getPosts: RequestHandler = async (req, res, next) => {
  const query = req.query;

  const city = query.city as string;
  const type = query.type as Type;
  const property = query.property as Property;
  const bathroom = query.bathroom as string;
  const bedroom = query.bedroom as string;
  const minPrice = query.minPrice as string;
  const maxPrice = query.maxPrice as string;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bathroom: parseInt(bathroom) || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || undefined,
          lte: parseInt(maxPrice) || undefined,
        },
      },
    });
    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (error) {
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
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "",
        async (err: any, data: any) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: data.id,
                },
              },
            });
            res.status(200).json({ ...post, isSaved: saved ? true : false });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get post." });
  }
};

export const addPost: RequestHandler = async (req, res, next) => {
  const body = <CreatePost>req.body;
  const tokenUserId = req.userId || "dd";

  const postData = body.postData;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
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
