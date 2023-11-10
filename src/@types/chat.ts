import { Message } from './message';
import { User } from './user';

export type ResponseValue = Chat[];

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}
