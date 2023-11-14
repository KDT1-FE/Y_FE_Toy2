import { ChatData } from './message';
import { User } from './user';

export interface ResponseValue {
  [x: string]: any;
  chats: Channel[];
}

export interface Channel {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: ChatData | null;
  updatedAt: Date;
}

export interface InviteRequestBody {
  chatId: string;
  users: string[];
}

export interface InviteResponseValue {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: Date;
}

export interface ExitResponseValue {
  message: string;
}
