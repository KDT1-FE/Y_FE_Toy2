import axios from 'axios';
import { CONTENT_TYPE, SERVER_ID, SERVER_URL } from '../constant';
import { JoinData } from '../interfaces/interface';

const client = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'content-type': CONTENT_TYPE,
    serverId: SERVER_ID,
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

export const getAllUsers = async (accessToken: string) => {
  const res = await client.get('/users', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export const createGameRooms = async (
  accessToken: string,
  name: string,
  users: string[],
  isPrivate: boolean,
) => {
  const res = await client.post(
    `chat`,
    { name: name, users: users, isPrivate: isPrivate },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

export const getAllGameRooms = async (accessToken: string) => {
  const res = await client.get(`chat/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const participateGameRoom = async (
  chatId: string,
  accessToken: string,
) => {
  const res = await client.patch(
    `chat/participate`,
    { chatId: chatId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
