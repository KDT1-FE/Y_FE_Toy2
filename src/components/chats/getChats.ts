import { instance } from '@/lib/api';
import { Chat } from './chatsStore';
const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
export const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Cache-Control': 'no-cache',
};

export const getMyChats = async (): Promise<Chat[]> => {
    try {
        const res = await instance.get<Chat[], any>(`chat`, { headers });
        console.log('getMyChats response:', res);
        if (res) {
            return res.chats;
        } else {
            console.log('내 채팅 데이터 조회 실패');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getAllChats = async () => {
    try {
        const res = await instance.get<Chat[], any>(`chat/all`, { headers });
        if (res) {
            return res.chats;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};
