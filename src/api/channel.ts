import { ResponseValue } from '../@types/channel';
import instance from './axios';

export const getChannels = async () => {
  const response = await instance.get<ResponseValue>('/chat/all');

  return response.data.chats;
};
