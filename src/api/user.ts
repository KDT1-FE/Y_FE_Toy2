import { User } from '../@types/user';
import instance from './axios';

export const getUser = async (userId: string) => {
  try {
    const response = await instance.get<{ user: User }>(
      `user?userId=${userId.split(':')[1]}`,
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

    const totalUsers = users.length;

    const userNames = users.map((user) => user.name);
    const profilePictures = users.map((user) => user.picture);

    return { totalUsers, userNames, profilePictures };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
