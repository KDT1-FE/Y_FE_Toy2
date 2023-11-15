import { useEffect, useState } from 'react';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';
import getSocket from '../api/socket';

export const useJoinLeaveChannels = (chatId: string) => {
  const [userList, setUserList] = useState<User2[]>([]);

  useEffect(() => {
    const getAllMemberList = async () => {
      const { data } = await findUserDataInChannel(chatId);
      const firstMemberList = data.chat.users;
      setUserList(firstMemberList);
    };
    getAllMemberList();
    const socket = getSocket(chatId);

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
  }, []);

  return { userList, setUserList };
};

export default useJoinLeaveChannels;
