export type SocketMsgData = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: string;
};

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  getMessage: (data: SocketMsgData) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  newUser: (userId: string) => void;
  sendMessage: (data: { receiverId: string; data: SocketMsgData }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
