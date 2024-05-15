import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/server";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({
  cors: {
    origin: "http://localhost:5173",
  },
});

type OnlineUser = {
  userId: string;
  socketId: string;
};

let onlineUser: OnlineUser[] = [];

const addUser = (userId: string, socketId: string) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId: string) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log("socket seMessage 수신");
    const receiver = getUser(receiverId);
    if (receiver?.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
