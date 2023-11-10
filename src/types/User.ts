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
  hashtag: string[];
};

export type UserSimple = Pick<User, 'id' | 'name' | 'picture'>;
