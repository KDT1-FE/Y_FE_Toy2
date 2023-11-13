/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';

const useSocket = () => {
  const { chatId = '' } = useParams();
  const [socketIo, setSocket] = useState<Socket>();
  const [isConnected, setConnected] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      extraHeaders: {
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    socket.on('connect', () => {
      setConnected(true);
      setSocket(socket);
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      setConnected(false);
      console.log('socket disconnected');
    });
  }, []);

  return { isConnected, socket: socketIo };
};
export default useSocket;
