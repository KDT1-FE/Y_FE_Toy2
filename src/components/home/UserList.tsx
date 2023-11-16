import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { io, Socket } from 'socket.io-client';
import List from '../../styles/home/UserList.styled';
import User from './User';
import { UserData, getData } from '../../utils/utils';
import { accessTokenState } from '../../atoms';
import { privateApi } from '../../libs/axios';
import SkeletonUser from './SkeletonUser';

function UserList({ language }: { language: string }) {
  const accessToken = useRecoilValue(accessTokenState);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [userData, setUserData] = useState<UserData[]>([]);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(`https://fastcampus-chat.net/server`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: `${process.env.REACT_APP_SERVER_ID}`,
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
      {userData.length !== 0
        ? userData.map((data: UserData) => {
            const { id } = data;
            return <User key={id} data={data} onlineUser={onlineUser} />;
          })
        : new Array(8)
            .fill(0)
            .map((_, index: React.Key) => <SkeletonUser key={index} />)}
    </List>
  );
}

export default UserList;
