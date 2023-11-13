import {
  ResponseValue,
  InviteRequestBody,
  InviteResponseValue,
  ExitResponseValue,
} from '../@types/channel';
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
  const response = await instance.get<ResponseValue>('/chat');
  return response.data.chats;
};

export const inviteChannel = async (inviteData: InviteRequestBody) => {
  const response = await instance.patch<InviteResponseValue>(
    '/chat/invite',
    inviteData,
  );
  return response.data;
};

export const exitChannel = async ({ chatId }: IchatId) => {
  const newChatId = { chatId };
  const response = await instance.patch<ExitResponseValue>(
    '/chat/leave',
    newChatId,
  );
  return response.data;
};

interface IchatId {
  chatId: string;
}

export const participateChannel = async (chatId: string) => {
  const newChatId = { chatId };
  const response = await instance.patch<InviteResponseValue>(
    '/chat/participate',
    newChatId,
  );
  return response.data;
};
