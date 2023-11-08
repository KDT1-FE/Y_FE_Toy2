import axios from 'axios';
import { SERVER_URL, CONTENT_TYPE, SERVER_ID } from '../constant';

export const signup = async (
  id: string,
  password: string,
  name: string,
  picture?: string,
) => {
  const authData = {
    id,
    password,
    name,
    picture,
  };
  try {
    return await axios.post(`${SERVER_URL}/signup`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (id: string, password: string) => {
  const authData = {
    id,
    password,
  };
  try {
    const response = await axios.post(`${SERVER_URL}/login`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
      },
    });
    const { accessToken } = response.data;
    localStorage.setItem('jwt', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const getAllUsers = async (accessToken: string) => {
  const response = await axios.get(`${SERVER_URL}/users`, {
    headers: {
      'content-type': CONTENT_TYPE,
      serverId: SERVER_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

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
