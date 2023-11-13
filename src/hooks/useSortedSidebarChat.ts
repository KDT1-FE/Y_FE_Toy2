import {useEffect, useState} from 'react';
import {Chat} from 'types/chatroom.types';
import useRealTimeUpdate from './useRealTimeUpdate';

export default function useSortedSidebarChat() {
  const [sortedChat, setSortedChat] = useState<Chat[]>([]);
  const {
    updateQuery: {isLoading, data: realTimeData},
  } = useRealTimeUpdate();

  useEffect(() => {
    if (!isLoading && realTimeData) {
      const sorted = realTimeData.chats.sort(
        (a: Chat, b: Chat) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      setSortedChat(sorted);
    }
  }, [isLoading, realTimeData]);

  return sortedChat;
}
