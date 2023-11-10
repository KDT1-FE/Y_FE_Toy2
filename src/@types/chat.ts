import { MessageData } from './message';
import { User } from './user';

export type ResponseValue = Channel[];

export interface Channel {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessageData: MessageData | null;
  updatedAt: Date;
}
