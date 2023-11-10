import { Channel } from '../@types/chat';
import instance from './axios';

export const getChannels = async () => {
  const response = await instance.get<Channel[]>('/chat/all');

  return response.data;
};

export const getMyChannels = async () => {
  const response = await instance.get<{ chats: Channel[] }>('/chat');
  const chatsData = await response.data.chats;

  return chatsData;
};

// interface RequestBody {
//   chatId: string;
//   users: string[]; // 초대할 유저 id
// }
// const requestBody = {
//   chatId: '8cb0702a-4bd8-42a9-968e-18df8e5f0665',
//   users: ['user2'],
// };

// export const InviteChannels = async (requestBody:RequestBody) => {
//   const response = await instance.patch<Chat[]>(`/chat/${requestBody.chatId}/invite`, requestBody);
//   const data: { chats: ResponseValue } = await response.data;

//   return data.chats;
// };
