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
