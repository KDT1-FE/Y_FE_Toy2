import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';

export const useJoinLeaveChannels = (chatId: string) => {
  const [memberList, setMemberList] = useState<User2[]>([]);
  const [onlineMemberIds, setOnlineMembersIds] = useState<string[]>([]);

  useEffect(() => {
    const getAllMemberList = async () => {
      const { data } = await findUserDataInChannel(chatId);
      const firstMemberList = data.chat.users;
      setMemberList(firstMemberList);
    };
    getAllMemberList();

    socket.emit(SOCKET.USERS);
    socket.on(SOCKET.USER_TO_CLIENT, (messages: { users: string[] }) => {
      if (!messages) return;
      setOnlineMembersIds(messages.users);
    });

    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newMemberList = await getMemberData(messages.users);
        setMemberList(newMemberList);
      },
    );

    return () => {
      socket.off(SOCKET.LEAVE);
      socket.off(SOCKET.USER_TO_CLIENT);
    };
  }, [chatId]);

  return { memberList, onlineMemberIds, setMemberList };
};

export default useJoinLeaveChannels;
