export interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}

export interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.

  updatedAt: Date;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}
