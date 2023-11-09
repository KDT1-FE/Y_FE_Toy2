// axios 설정
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://fastcampus-chat.net/server', {
  extraHeaders: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkMDIyNjA3OnVzZXJJZCIsImlhdCI6MTY5OTM3MTE3MywiZXhwIjoxNjk5OTc1OTczfQ.SIvnz9dFVW6qODtES_NbUSZQ9LCULFaFSLNrNZ9N6hk',
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}

interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.

  updatedAt: Date;
}

interface Message {
  id: string;
  text: string;
  userId: string;

  createdAt: Date;
}

const Chats = () => {
  const [users, setUsers] = useState<string>('');
  const axiosInstance = axios.create({
    baseURL: 'https://fastcampus-chat.net',
    headers: {
      'Content-Type': 'application/json',
      serverId: `${process.env.REACT_APP_SERVER_ID}`,
    },
  });

  // API 호출 함수
  // const callApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  //   try {
  //     const response = await axiosInstance(config);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  useEffect(() => {
    socket.on('users-server-to-client', messageObject => {
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
