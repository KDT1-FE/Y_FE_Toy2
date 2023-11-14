/* eslint-disable no-console */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { MessageType } from '../types/MessageType';

const useSocket = (chatId: string) => {
  const [socketIo, setSocket] = useState<Socket>();
  const [isConnected, setConnected] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    // Socket.IO 서버의 주소를 입력합니다.
    const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      autoConnect: false,
      extraHeaders: {
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    socket.connect();
    socket.emit('fetch-messages');
    socket.on('connect', () => {
      setConnected(true);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    // 컴포넌트가 언마운트되면 소켓 연결을 해제합니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socketIo?.on('messages-to-client', (data) => {
      console.log(data.messages);
      setMessages([...data.messages]);
    });

    return () => {
      socketIo?.off('messages-to-client');
    };
  }, [messages, isConnected]);

  useEffect(() => {
    socketIo?.on('message-to-client', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketIo?.off('message-to-client');
    };
  }, [messages, isConnected]);

  return { isConnected, socket: socketIo, messages };
};
export default useSocket;
