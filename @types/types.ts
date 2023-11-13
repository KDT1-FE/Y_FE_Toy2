export interface IUser {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}

export interface IChat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: IChatUser[];
  latestMessage: IMessage; // message 객체가 속합니다.
  updatedAt: string;
}

export interface IChatUser {
  id: string;
  username: string;
  picture: string;
}

export interface IMessage {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export interface JoinersData {
  users: string[]; // 참여자들 id
  joiners: string[]; // 새로운 참여자 id
}

export interface LeaverData {
  users: string[]; // 참여자들 id
  leaver: string; // 나간 사용자 id
}
