// loginSocket.ts
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
};
