import {
  Channel,
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

export const exitChannel = async (chatId: string) => {
  const response = await instance.patch<ExitResponseValue>(
    '/chat/leave',
    chatId,
  );
  return response.data;
};
