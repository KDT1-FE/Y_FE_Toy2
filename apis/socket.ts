import { io } from 'socket.io-client';
import { CLIENT_URL } from './constant';

const chatSocket = (accessToken: any, chatId: string) => {
  const chattingSocket = io(`${CLIENT_URL}?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: process.env.NEXT_PUBLIC_API_KEY!,
    },
  });
  chattingSocket.on('connect', () => {
    console.log('Connected from server');
    setTimeout(() => {
      chattingSocket?.emit('fetch-messages');
    }, 500);
  });
  chattingSocket.on('error', error => {
    console.error('Socket.IO connection error:', error);
    // 여기에 연결 오류 처리 로직을 추가하세요
  });
  chattingSocket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  return chattingSocket;
};

export default chatSocket;