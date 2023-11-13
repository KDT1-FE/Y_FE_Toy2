import { UserInfo } from '../libs/firestoreConverter';

export interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}

export type FbUser = Omit<User, 'chats'> & {
  intro: string;
  language: string;
  level: string;
  hashtags: string[];
};

export type UserInfoWithId = UserInfo & {
  id: string;
};

export type UserSimple = Pick<User, 'id' | 'name' | 'picture'>;
