import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = <{ [key: string]: string }>req.body;

  if (id !== tokenUserId) {
    return res.json(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.json(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost: RequestHandler = async (req, res, next) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId as string;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const profilePosts: RequestHandler = async (req, res, next) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber: RequestHandler = async (req, res, next) => {
  const tokenUserId = req.userId;
  try {
    const chatNumber = await prisma.chat.count({
      where: {
        userIDs: {
          has: tokenUserId,
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(200).json(chatNumber);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
