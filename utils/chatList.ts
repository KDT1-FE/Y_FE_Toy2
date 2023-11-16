import { Chat } from '@/@types/types';
import { convertToMilliSecond } from './formattedTimeData';

export const sortChatList = (chatList: Chat[]) => {
  const sortedChatList = chatList.sort(
    (a, b) =>
      convertToMilliSecond(b.updatedAt) - convertToMilliSecond(a.updatedAt),
  );
  return sortedChatList;
};

export const filterPrivateChat = (chatList: Chat[], isPrivate: boolean) =>
  chatList.filter((chat: Chat) => chat.isPrivate === isPrivate);
