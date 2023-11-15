import React, { useEffect, useState, useRef } from 'react';
import serverSocket from '../api/serverSocket';
import { getMyChannels } from '../api/channel';
import { ToastId, useToast } from '@chakra-ui/react';
import { splitChannelName } from '../utils';
import { SOCKET } from '../constants/socket';
import { getAuthUser } from '../api/user';

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
      const userId = messages.responseChat.users;
      const authId = await getAuthUser();
      const invitedUserId = userId.filter((id) => authId == id);
      toastIdRef.current = toast({
        description: `${chatName} 방에 초대되었습니다.내 채팅방에서 확인해보세요!`,
      });
    });

    return () => {
      serverSocket.off(SOCKET.INVITE);
    };
  }, []);
};
