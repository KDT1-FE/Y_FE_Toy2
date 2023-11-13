import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { getUser } from '../api/user';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';

export const useJoinLeaveChannels = (chatId: string) => {
  const [memberList, setMemberList] = useState<User2[]>([]);

  useEffect(() => {
    const getAllMemberList = async () => {
      const { data } = await findUserDataInChannel(chatId);
      const firstMemberList = data.chat.users;
      setMemberList(firstMemberList);
    };
    getAllMemberList();
    console.log(memberList);

    //실시간 유저 받기 + 기존...리스트랑 비교해서 나누기
    socket.emit(SOCKET.USERS);
    socket.on(SOCKET.USER_TO_CLIENT, (messages: { users: string[] }) => {
      console.log(SOCKET.USER_TO_CLIENT, messages);
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
  }, []);
  return { memberList, setMemberList };
};

export default useJoinLeaveChannels;
