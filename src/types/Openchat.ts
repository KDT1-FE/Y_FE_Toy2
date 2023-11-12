import { ChatInfo } from '../libs/firestoreChatConverter';

export const hobby = [
  '음악감상',
  '춤',
  '여행',
  '요리',
  '영화감상',
  '게임',
  '스터디',
  '독서',
  '그림그리기',
];
export const sports = ['운동', '러닝', '축구', '농구', '야구', '수영'];
export const animal = ['강아지', '고양이', '식물'];

export interface Chats {
  chats: Chat[];
}
export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

export type ChatInfoWithId = ChatInfo & {
  id: string;
};
export type Openchat = ChatInfo & Chat;
