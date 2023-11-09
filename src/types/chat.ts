import { Message } from './message';

export interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.
  updatedAt: Date;
}
