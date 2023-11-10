import { io, Socket } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../constant';

let socket: Socket | null = null;

export const loginSocket = (
  accessToken: any,
  onDataReceived: (data: any[]) => void,
) => {
  socket = io(`${SERVER_URL}/server`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });

  socket.on('connect', () => {
    socket?.emit('users-server');
  });

  socket.on('users-server-to-client', (data) => {
    onDataReceived(data);
  });

  return socket;
};

export const disconnectLoginSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
