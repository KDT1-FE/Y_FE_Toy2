import { Channel } from '../@types/chat';
import instance from './axios';

export const getChannels = async () => {
  const response = await instance.get<Channel[]>('/chat/all', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
      serverId: process.env.REACT_APP_SERVER_ID,
    },
  });

  return response.data;
};
