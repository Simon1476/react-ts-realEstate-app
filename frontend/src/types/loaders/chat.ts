export type Receiver = {
  id: string;
  username: string;
  avatar: string | null;
};

export type GetChats = {
  id: string;
  userIDs: string[];
  createdAt: string;
  seenBy: string[];
  lastMessage: string;
  receiver: Receiver;
}[];

type message = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: string;
};

export type GetSingleChat = {
  id: string;
  userIDs: string[];
  createdAt: string;
  seenBy: string[];
  lastMessage: string;
  messages: message[];
  receiver: Receiver;
};
