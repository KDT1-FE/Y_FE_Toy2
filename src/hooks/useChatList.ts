import { useState, useEffect } from 'react';
import { ChatInfo, ChatData } from '../@types/message';
import socket from '../api/socket';
import { SOCKET } from '../constants/socket';
import { getAllChats, getChat } from '../api/chat';

const useChatList = () => {
  const [chats, setChats] = useState<ChatInfo[]>([]);
  useEffect(() => {
    socket.emit(SOCKET.FETCH_MESSAGES);
    socket.on(
      SOCKET.MESSAGES_TO_CLIENT,
      async ({ messages }: { messages: ChatData[] }) => {
        const allChats = await getAllChats(messages);
        if (allChats) setChats(allChats);
      },
    );
    socket.on(SOCKET.MESSAGE_TO_CLIENT, async (message: ChatData) => {
      const chat = await getChat(message);
      if (chat) setChats((prevValue) => [...prevValue, chat]);
    });
    return () => {
      socket.off(SOCKET.MESSAGES_TO_CLIENT);
      socket.off(SOCKET.MESSAGE_TO_CLIENT);
    };
  }, []);
  return chats;
};

export default useChatList;
