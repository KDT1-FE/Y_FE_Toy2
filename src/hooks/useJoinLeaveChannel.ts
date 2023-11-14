import { useEffect, useState } from 'react';
import socket from '../api/socket';
import { User2 } from '../@types/user';
import { SOCKET } from '../constants/socket';
import { getMemberData, findUserDataInChannel } from '../api/channel';
import serverSocket from '../api/serverSocket';

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
      //setOnlineUsersIds(messages.users);
      console.log('USER_TO_CLIENT', messages); // 현재방의 실시간유저, 방 랜더링 안되니까 당연히 안바뀜
    });

    serverSocket.emit(SOCKET.USERS_SERVER);
    serverSocket.on(
      SOCKET.USERS_SERVER_TO_CLIENT,
      (messages: { users: string[] }) => {
        if (!messages) return;
        setOnlineUsersIds(messages.users);
        console.log('users-server-to-client', messages);
      },
    );

    socket.on(
      SOCKET.LEAVE,
      async (messages: { users: string[]; joiners: string[] }) => {
        const newMemberList = await getMemberData(messages.users);
        setUserList(newMemberList);
      },
    );

    return () => {
      socket.off(SOCKET.LEAVE);
      serverSocket.off(SOCKET.USERS_SERVER_TO_CLIENT);
    };
  }, [chatId]);

  return { userList, onlineUserIds, setUserList };
};

export default useJoinLeaveChannels;
