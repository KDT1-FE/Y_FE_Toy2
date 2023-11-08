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

export const createGameRooms = async (
  accessToken: string,
  name: string,
  users: string[],
  isPrivate: boolean,
) => {
  const authData = {
    name,
    users,
    isPrivate,
  };
  try {
    const response = await axios.post(`${SERVER_URL}/chat`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGameRooms = async (accessToken: string) => {
  const response = await axios.get(`${SERVER_URL}/chat/all`, {
    headers: {
      'content-type': CONTENT_TYPE,
      serverId: SERVER_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const participateGameRoom = async (
  chatId: string,
  accessToken: string,
) => {
  const authData = {
    chatId,
  };
  const response = await axios.patch(
    `${SERVER_URL}/chat/participate`,
    authData,
    {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log(response.data);
  return response.data;
};
