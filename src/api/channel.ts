import { Channel } from '../@types/chat';
import instance from './axios';

export const getChannels = async () => {
  const response = await instance.get<Channel[]>('/chat/all');

  return response.data;
};
