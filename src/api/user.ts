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
