import { ChatData } from '../@types/message';
import { getUser } from './user';

export const getAllChats = async (messages: ChatData[]) => {
  try {
    const chatListData = [];
    for (const message of messages) {
      const { id, createdAt, text, userId } = message;
      const response = await getUser(userId.split(':')[1]);
      if (response) {
        const { name, picture } = response;
        chatListData.push({
          id,
          createdAt: createdAt.split('T')[0],
          text,
          name,
          picture,
        });
      }
    }
    return chatListData.reverse();
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
