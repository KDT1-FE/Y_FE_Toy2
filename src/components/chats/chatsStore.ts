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
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[]; // chat id만 속합니다.
    username: string;
}
// 서버에 있는 모든 채팅 정보 조회
export const allChatsState = atom<Chat[]>({
    key: 'allChatsState',
    default: [],
});

export const myChatsState = atom<Chat[]>({
    key: 'myChatsState',
    default: [],
});

export const searchChatsState = atom<Chat[]>({
    key: 'searchChatsState',
    default: [],
});
