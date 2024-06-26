// import { createContext, useContext, useEffect, useState } from "react";
// import { Socket, io } from "socket.io-client";
// import { AuthContext } from "./AuthContext";

// type SocketData = {
//   id: string;
//   text: string;
//   userId: string;
//   chatId: string;
//   createdAt: string;
// };

// interface ServerToClientEvents {
//   getMessage: (data: SocketData) => void;
// }

// interface ClientToServerEvents {
//   sendMessage: (data: { receiverId: string; data: SocketData }) => void;
//   newUser: (id: string) => void;
// }

// export const SocketContext = createContext<Socket<
//   ServerToClientEvents,
//   ClientToServerEvents
// > | null>(null);

// export const SocketContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { currentUser } = useContext(AuthContext);
//   const [socket, setSocket] = useState<Socket<
//     ServerToClientEvents,
//     ClientToServerEvents
//   > | null>(null);

//   useEffect(() => {
//     setSocket(io("http://localhost:4000"));
//   }, []);

//   useEffect(() => {
//     currentUser.id && socket?.emit("newUser", currentUser.id);
//   }, [currentUser, socket]);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
