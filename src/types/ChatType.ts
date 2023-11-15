import { UserData } from '../utils/utils';
import { MessageType } from './MessageType';

type CommonUserType = {
  id: string;
  picture: string;
};

type User = CommonUserType & {
  username: string;
};

export type UserType = CommonUserType & {
  name: string;
};

export type ChatType = {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: MessageType | null;
  updatedAt: Date;
};
