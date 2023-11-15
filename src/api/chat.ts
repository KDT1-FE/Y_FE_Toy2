import { ChatData } from '../@types/message';
import { getUser } from './user';

export const getJoinersName = async (users: string[]) => {
  try {
    const userList = [];
    for (const userId of users) {
      const response = await getUser(userId);
      if (response) {
        const { name } = response;
        userList.push(name);
      }
    }
    return userList;
  } catch (error) {
    console.log(error);
  }
};

export const getLeaverName = async (userId: string) => {
  try {
    const response = await getUser(userId);
    if (response) {
      const { name } = response;
      return name;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChat = async (message: ChatData) => {
  try {
    const { id, createdAt, text, userId } = message;
    const response = await getUser(userId);
    if (response) {
      const { name, picture } = response;
      return { id, createdAt: createdAt.split('T')[0], text, name, picture };
    }
  } catch (error) {
    console.log(error);
  }
};
