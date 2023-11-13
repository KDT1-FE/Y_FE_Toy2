import { User } from '../@types/user';
import instance from './axios';

export const getUser = async (userId: string) => {
  try {
    const response = await instance.get<{ user: User }>(
      `user?userId=${userId}`,
    );
    const { name, picture } = response.data.user;
    return { name, picture };
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await instance.get<User[]>('users');
    const users = response.data;
    console.log(users);
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
