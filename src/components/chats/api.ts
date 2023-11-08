import { instance } from '@/lib/api';
import axios, { AxiosResponse } from 'axios';

export interface Chat {
    id?: string;
    name?: string;
    isPrivate?: boolean;
    users?: string[];
    latestMessage?: Message | null;

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
}

// 채팅창에 보여줄 정보
export interface ChatItem {
    name?: string;
    users?: User[];
    latestMessage?: Message | null;
}

// 모든 채팅 정보 가져오는 함수
