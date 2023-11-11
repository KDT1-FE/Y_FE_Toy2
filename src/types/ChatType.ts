import { MessageType } from './MessageType';

export interface User {
  id: string;
  name: string;
  picture: string;
}

export type ChatType = {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: MessageType | null;
  updatedAt: Date;
};
