import "./chat.scss";
import { GetChats, GetSingleChat, Receiver } from "../../types/loaders/chat";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";

const defaultValue: GetSingleChat = {
  id: "",
  userIDs: [""],
  createdAt: "",
  seenBy: [""],
  lastMessage: "",
  messages: [],
  receiver: {
    id: "",
    username: "",
    avatar: "",
    chatId: "",
  },
};

type SocketData = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: string;
};

const Chat = ({ chats }: { chats: GetChats }) => {
  const [chat, setChat] = useState<GetSingleChat>(defaultValue);
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);

  const handleOpenChat = async (chatId: string, receiver: Receiver) => {
    try {
      const res = await apiRequest("/chats/" + chatId);
      console.log(res);

      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      console.log(res);

      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data: SocketData) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver?.avatar || "noavatar.jpg"} alt="" />
            <span>{c.receiver?.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat.id !== "" && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver?.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage own"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
