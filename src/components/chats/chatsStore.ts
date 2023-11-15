import { atom } from 'recoil';

export interface Chat {
  id?: string;
  name: string;
  isPrivate?: boolean;
  users?: User[];
  latestMessage?: Message | null;
  onClick?: () => void;
  updatedAt?: Date;
}

export interface Message {
  id: string;
  text: string;
  userId: string;

  createdAt: Date;
}

export interface User {
  id: string | null;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
  username: string;
}

export interface EnterChatRoomModalProps {
  onEnterClick: () => void;
  onCancleClick: () => void;
  isOpen: boolean;
  chat: Chat;
}
// 서버에 있는 모든 채팅방 정보 조회
export const allChatsState = atom<Chat[]>({
  key: 'allChatsState',
  default: [],
});
// 서버에 있는 내 채팅방 정보 조회
export const myChatsState = atom<Chat[]>({
  key: 'myChatsState',
  default: [],
});

// 검색할 때 나오는 Input 값
export const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
});

// 검색했을 때 나오는 채팅방 조회
export const searchChatsState = atom<Chat[]>({
  key: 'searchChatsState',
  default: [],
});
