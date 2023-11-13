/* eslint-disable no-console */
import { useEffect, useState } from 'react';
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
      extraHeaders: {
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 연결이 성공했을 때 실행됩니다.
    socket.on('connect', () => {
      socket.emit('fetch-messages');

      socket.on('messages-to-client', (data) => {
        console.log('messages 받기');
        setMessages([...data.messages]);
      });

      socket.on('message-to-client', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setConnected(true);
    });

    // 연결이 끊겼을 때 실행됩니다.
    socket.on('disconnect', () => {
      socket.off('messages-to-client');
      socket.off('message-to-client');
      setConnected(false);
      setSocket(socket);
    });

    // 컴포넌트가 언마운트되면 소켓 연결을 해제합니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  return { isConnected, socket: socketIo, messages };
};
export default useSocket;
