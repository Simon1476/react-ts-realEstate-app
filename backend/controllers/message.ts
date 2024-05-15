import { RequestHandler } from "express";
import prisma from "../lib/prisma";

export const addMessage: RequestHandler = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const { text } = req.body;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    const message = await prisma.message.create({
      data: {
        text: text,
        userId: tokenUserId,
        chatId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to add message!" });
  }
};
