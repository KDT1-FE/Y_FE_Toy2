import { useState, useEffect, useRef } from 'react';
import { ChatData } from '../@types/message';
import { SOCKET } from '../constants/socket';
import { getLeaverName, getJoinersName } from '../api/chat';
import { ToastId, useToast } from '@chakra-ui/react';
import { getJoinerMessage, getLeaverMessage } from '../utils/chat';
import getSocket from '../api/socket';

const useChatList = (chatId: string) => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  useEffect(() => {
    const socket = getSocket(chatId);
    socket.emit(SOCKET.FETCH_MESSAGES);
    socket.on(
      SOCKET.MESSAGES_TO_CLIENT,
      async ({ messages }: { messages: ChatData[] }) => {
        if (messages) setChats(messages);
        setIsLoading(false);
      },
    );
    socket.on(SOCKET.MESSAGE_TO_CLIENT, async (message: ChatData) => {
      if (message) setChats((prevValue) => [...prevValue, message]);
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
      socket.disconnect();
    };
  }, []);
  return { chats, isLoading };
};

export default useChatList;
