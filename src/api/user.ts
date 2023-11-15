import { AuthResponseValue, User } from '../@types/user';
import instance from './axios';

export const getUser = async (userId: string) => {
  const response = await instance.get<{ user: User }>(`user?userId=${userId}`);
  return response.data.user;
};

export const getAllUsers = async () => {
  try {
    const response = await instance.get<User[]>('users');
    const users = response.data;
    const totalUsers = users.length;

    const userNames = users.map((user) => user.name);
    const profilePictures = users.map((user) => user.picture);

    return { totalUsers, userNames, profilePictures };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 전체 유저 받아오는 로직에 user id 값이 없어서 추가했습니다.
export const getUsers = async () => {
  try {
    const response = await instance.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const response = await instance.get<AuthResponseValue>('/auth/me');
    const authUserId = response.data.user?.id;

    return authUserId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
