import { accessTokenState } from './../states/atom';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { CONTENT_TYPE, SERVER_ID, SERVER_URL } from '../constant';
import { JoinData } from '../interfaces/interface';

const accessToken: string = useRecoilValue(accessTokenState);

const client = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'content-type': CONTENT_TYPE,
    serverId: SERVER_ID,
    Authorization: `Bearer ${accessToken}`,
  },
});

export const postLogin = async (id: string, password: string) => {
  const res = await client.post('/login', {
    id: id,
    password: password,
  });
  return res;
};

export const postJoin = async (joinData: JoinData) => {
  const res = await client.post('/signup', joinData);
  return res;
};

export const postRefresh = async (refreshToken: string) => {
  const res = await client.post('/refresh', {
    refreshToken: refreshToken,
  });
  return res;
};

export const getAllUsers = async () => {
  const res = await client.get('users');
  return res;
};

export const getUserData = async (userId: string) => {
  const res = await client.get(`/user?userId=${userId}`, {});
  return res.data;
};

export const patchUserData = async (name?: string, picture?: string) => {
  const res = await client.patch(`/user`, {
    name: name,
    picture: picture,
  });
  return res;
};

export const createGameRooms = async (
  name: string,
  users: string[],
  isPrivate: boolean,
) => {
  const res = await client.post(`chat`, {
    name: name,
    users: users,
    isPrivate: isPrivate,
  });
  return res.data;
};

export const getAllGameRooms = async () => {
  const res = await client.get(`chat/all`);
  return res.data;
};

export const participateGameRoom = async (chatId: string) => {
  const res = await client.patch(`chat/participate`, { chatId: chatId });
  return res.data;
};

export const getAllMyChat = async () => {
  const res = await client.get(`chat`);
  return res.data;
};

export const leaveGameRoom = async (chatId: string) => {
  const res = await client.patch(`/chat/leave`, { chatId: chatId });
  console.log(res);
  return res;
};
