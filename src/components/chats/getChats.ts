import { instance } from '@/lib/api';
import { Chat } from './chatsStore';
import { AxiosResponse } from 'axios';
import { getCookie } from '@/lib/cookie';

const accessToken = getCookie('accessToken');

export const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Cache-Control': 'no-cache',
};

export const getMyChats = async (): Promise<Chat[]> => {
  try {
    const res = await instance.get<Chat[], any>('chat', { headers });
    console.log('getMyChats response:', res);
    if (res.chats) {
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
