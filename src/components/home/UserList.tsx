import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { io, Socket } from 'socket.io-client';
import List from '../../styles/home/UserList.styled';
import User from './User';
import { UserData, getData } from '../../utils/utils';
import { accessTokenState } from '../../atoms';
import { privateApi } from '../../libs/axios';

function UserList({ language }: { language: string }) {
  const accessToken = useRecoilValue(accessTokenState);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [userData, setUserData] = useState<UserData[]>([]);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(`https://fastcampus-chat.net/server`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: '9b9a6496',
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'users-server-to-client',
      (messageObject: { users: string[] }) => {
        setOnlineUser(messageObject.users);
      },
    );
  }, [socket]);

  const fetchData = async () => {
    const data = await getData(language);
    const res = await privateApi('auth/me');
    const { user } = res.data;

    const exceptMe = data.filter((data) => data.id !== user.id);
    setUserData(exceptMe);
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <List>
      {userData &&
        userData.map((data: UserData) => {
          const { id } = data;
          return <User key={id} data={data} onlineUser={onlineUser} />;
        })}
    </List>
  );
}

export default UserList;
