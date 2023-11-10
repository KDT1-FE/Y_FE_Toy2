import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../constant';

export const loginSocket = (
  accessToken: any,
  onDataReceived: (data: any[]) => void,
) => {
  const socket = io(`${SERVER_URL}/server`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });

  socket.on('connect', () => {
    socket.emit('users-server');
  });

  socket.on('users-server-to-client', (data) => {
    onDataReceived(data);
  });
<<<<<<< HEAD

  return socket;
};

export const chatSocket = (accessToken: string, chatId: string) => {
  // 클라이언트 소켓 생성
  const socket = io(`${SERVER_URL}/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID, // 서버 ID
    },
  });

  return socket;
=======
>>>>>>> b1480300f678929faeac31e1dc86d3ad334d1bb6
};
