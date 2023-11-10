import { MessageData } from './message';
import { User } from './user';

export type ResponseValue = Chat[];

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessageData: MessageData | null;
  updatedAt: Date;
}
