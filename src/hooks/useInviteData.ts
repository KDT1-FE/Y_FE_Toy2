import React, { useEffect, useState, useRef } from 'react';
import serverSocket from '../api/serverSocket';
import { getMyChannels } from '../api/channel';
import { ToastId, useToast } from '@chakra-ui/react';
import { splitChannelName } from '../utils';
import { SOCKET } from '../constants/socket';
import { getAuthUser } from '../api/user';
import { Channel } from '../@types/channel';

interface InviteResponseData {
  responseChat: {
    id: string;
    name: string;
    users: string[]; // 참여자들 id
    isPrivate: boolean;
    updatedAt: Date;
  };
}

export const useInviteData = () => {
  const [myChannelList, setMyChannelList] = useState<Channel[]>();
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  const fetchInviteChannelName = (name: string) => {
    const { title } = splitChannelName(name);
    return title;
  };

  useEffect(() => {
    serverSocket.on(SOCKET.INVITE, async (messages: InviteResponseData) => {
      if (!messages) return;
      const chatName = fetchInviteChannelName(messages.responseChat.name);
      toastIdRef.current = toast({
        description: `${chatName} 방이 내 채팅에 추가되었습니다.`,
      });

      const newMyChannelList = await getMyChannels();
      console.log('newMyChannelList', newMyChannelList);
      setMyChannelList(newMyChannelList);
    });

    return () => {
      serverSocket.off(SOCKET.INVITE);
    };
  }, [myChannelList]);
  return { myChannelList };
};
