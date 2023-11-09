// axios 설정
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from 'react-query';
import axiosInstance from './axiosInstance';

const socket = io('https://fastcampus-chat.net/server', {
  extraHeaders: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkMDIyNjA3OnVzZXJJZCIsImlhdCI6MTY5OTM3MTE3MywiZXhwIjoxNjk5OTc1OTczfQ.SIvnz9dFVW6qODtES_NbUSZQ9LCULFaFSLNrNZ9N6hk',
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

const Chats = () => {
  const [users, setUsers] = useState<string>('');

  useEffect(() => {
    socket.on('users-server-to-client', (messageObject) => {
      console.log(messageObject);
      setUsers(messageObject.users[0]);
    });
    console.log(socket);
  }, []);
  useEffect(() => {
    console.log('리렌더링');
    console.log(users);
  });
  return <div>접속 중인 사용자{users}</div>;
};

export default Chats;
