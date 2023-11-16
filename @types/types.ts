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
  users: ChatUser[];
  latestMessage: Message; // message 객체가 속합니다.
  updatedAt: Date;
}

export interface ChatUser {
  id: string;
  username: string;
  picture: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export interface JoinersData {
  users: string[]; // 참여자들 id
  joiners: string[]; // 새로운 참여자 id
}

export interface LeaverData {
  users: string[]; // 참여자들 id
  leaver: string; // 나간 사용자 id
}
