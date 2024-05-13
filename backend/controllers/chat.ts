import { RequestHandler } from "express";
import prisma from "../lib/prisma";

export const getChats: RequestHandler = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        receiver: true,
      },
    });

    for (const chat of chats) {
      const receivedId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receivedId,
        },

        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      await prisma.receiver.update({
        where: {
          chatId: chat.id,
        },
        data: {
          username: receiver?.username,
          avatar: receiver?.avatar,
        },
      });
    }
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat: RequestHandler = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        receiver: true,
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: [tokenUserId],
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat: RequestHandler = async (req, res) => {
  const tokenUserId = req.userId;
  const reqBody = <{ receiverId: string }>req.body;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, reqBody.receiverId],
        receiver: {
          create: {
            username: "",
            avatar: "",
          },
        },
      },
    });

    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat: RequestHandler = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
