import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { getUser } from '../api/user';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData } from '../api/channel';

export const useJoinLeaveChannels = (chatId: { chatId: string }) => {
  const [userList, setUserList] = useState<User2[]>([]);

  useEffect(() => {
    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newUserList = await getMemberData(messages.users);
        setUserList(newUserList);
      },
    );

    return () => {
      socket.off(SOCKET.LEAVE);
      socket.off(SOCKET.USER_TO_CLIENT);
    };
  }, []);
  return { userList, setUserList };
};

export default useJoinLeaveChannels;
