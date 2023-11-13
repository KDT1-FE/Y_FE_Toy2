import { useState, useEffect, useRef } from 'react';
import { ChatInfo, ChatData } from '../@types/message';
import socket from '../api/socket';
import { SOCKET } from '../constants/socket';
import {
  getAllChats,
  getChat,
  getLeaverName,
  getJoinersName,
} from '../api/chat';
import { ToastId, useToast } from '@chakra-ui/react';
import { getJoinerMessage, getLeaverMessage } from '../utils/chat';

const useChatList = () => {
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  useEffect(() => {
    socket.emit(SOCKET.FETCH_MESSAGES);
    socket.on(
      SOCKET.MESSAGES_TO_CLIENT,
      async ({ messages }: { messages: ChatData[] }) => {
        const allChats = await getAllChats(messages);
        if (allChats) setChats(allChats);
        setIsLoading(false);
      },
    );
    socket.on(SOCKET.MESSAGE_TO_CLIENT, async (message: ChatData) => {
      const chat = await getChat(message);
      if (chat) setChats((prevValue) => [...prevValue, chat]);
    });
    socket.on(
      SOCKET.JOIN,
      async (messages: { users: string[]; joiners: string[] }) => {
        const joiners = await getJoinersName(messages.joiners);
        if (!joiners) return;
        toastIdRef.current = toast({ description: getJoinerMessage(joiners) });
      },
    );

    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; leaver: string }) => {
        const leaver = await getLeaverName(messages.leaver);
        if (!leaver) return;
        toastIdRef.current = toast({ description: getLeaverMessage(leaver) });
      },
    );
    return () => {
      socket.off(SOCKET.MESSAGES_TO_CLIENT);
      socket.off(SOCKET.MESSAGE_TO_CLIENT);
      socket.off(SOCKET.JOIN);
      socket.off(SOCKET.LEAVE);
    };
  }, []);
  return { chats, isLoading };
};

export default useChatList;
