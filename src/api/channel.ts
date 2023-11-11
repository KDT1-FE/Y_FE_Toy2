import { Channel, ResponseValue } from '../@types/channel';
import instance from './axios';

export interface CreateChannelBody {
  name: string;
  users: string[];
  isPrivate: boolean;
}

export const getChannels = async () => {
  const response = await instance.get<ResponseValue>('/chat/all');
  return response.data.chats;
};

//내 채팅방 불러오기
export const getMyChannels = async () => {
  const response = await instance.get<{ chats: Channel[] }>('/chat');
  const chatsData = await response.data.chats;

  return chatsData;
};

export const createChannel = async (data: CreateChannelBody) => {
  try {
    const response = await instance.post('/chat', {
      name: data.name,
      users: data.users,
      isPrivate: data.isPrivate,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
