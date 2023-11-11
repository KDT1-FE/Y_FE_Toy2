import { ChatData } from './message';
import { User } from './user';

export interface ResponseValue {
  chats: Channel[];
}

export interface Channel {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessageData: ChatData | null;
  updatedAt: Date;
}
