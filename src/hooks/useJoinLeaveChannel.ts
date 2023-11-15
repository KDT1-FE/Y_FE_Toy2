import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';

export const useJoinLeaveChannels = (chatId: string) => {
  const [userList, setUserList] = useState<User2[]>([]);

  useEffect(() => {
    const getAllMemberList = async () => {
      const { data } = await findUserDataInChannel(chatId);
      const firstMemberList = data.chat.users;
      setUserList(firstMemberList);
    };
    getAllMemberList();

    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newMemberList = await getMemberData(messages.users);
        console.log('LEAVE', messages);
        setUserList(newMemberList);
      },
    );
    socket.on(
      SOCKET.JOIN,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newMemberList = await getMemberData(messages.users);
        console.log('JOIN', messages);
        setUserList(newMemberList);
      },
    );

    return () => {
      socket.off(SOCKET.JOIN);
      socket.off(SOCKET.LEAVE);
    };
  }, [chatId]);

  return { userList, setUserList };
};

export default useJoinLeaveChannels;
