import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';

export const useJoinLeaveChannels = (chatId: string) => {
  const [userList, setUserList] = useState<User2[]>([]);
  const [onlineUserIds, setOnlineUsersIds] = useState<string[]>([]);

  useEffect(() => {
    const getAllMemberList = async () => {
      const { data } = await findUserDataInChannel(chatId);
      const firstMemberList = data.chat.users;
      setUserList(firstMemberList);
    };
    getAllMemberList();

    socket.emit(SOCKET.USERS);
    socket.on(SOCKET.USER_TO_CLIENT, (messages: { users: string[] }) => {
      if (!messages) return;
      setOnlineUsersIds(messages.users);
    });

    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newMemberList = await getMemberData(messages.users);
        setUserList(newMemberList);
      },
    );

    return () => {
      socket.off(SOCKET.LEAVE);
      socket.off(SOCKET.USER_TO_CLIENT);
    };
  }, [chatId]);

  return { userList, onlineUserIds, setUserList };
};

export default useJoinLeaveChannels;
