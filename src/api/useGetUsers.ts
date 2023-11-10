import { User } from '../@types/user';
import instance from '../constants/appClient';

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
