import { ResponseValue, Channel } from '../@types/channel';
import { checkChannelName } from '../utils';
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

export const createChannel = async (data: CreateChannelBody) => {
  try {
    console.log(data.name);

    const isValidChannelName = checkChannelName(data.name);
    if (!isValidChannelName) return alert('채널 이름이 유효하지 않습니다.');

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
