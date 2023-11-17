import {
  ResponseValue,
  InviteRequestBody,
  InviteResponseValue,
  ExitResponseValue,
  Channel,
} from '../@types/channel';
import instance from './axios';
import { getUser } from './user';

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

export const exitChannel = async (chatId: { chatId: string }) => {
  const response = await instance.patch<ExitResponseValue>(
    '/chat/leave',
    chatId,
  );
  return response.data;
};

export const findUserDataInChannel = async (chatId: string) => {
  const response = await instance.get<{ chat: Channel }>(
    `/chat/only?chatId=${chatId}`,
  );
  return response;
};

export const getMemberData = async (users: string[]) => {
  const userListData = [];
  for (const id of users) {
    const response = await getUser(id);
    if (response) {
      const { name, picture } = response;
      userListData.push({
        id,
        name,
        picture,
      });
    }
  }
  return userListData;
};

export const participateChannel = async (chatId: { chatId: string }) => {
  const response = await instance.patch<InviteResponseValue>(
    '/chat/participate',
    chatId,
  );
  return response.data;
};
