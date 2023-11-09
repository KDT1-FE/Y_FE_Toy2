import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../constant';

export const loginSocket = (accessToken: string) => {
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
    console.log('Received users from server:', data);
  });

  socket.on('message-to-client', (messageObject) => {
    const usersArr = messageObject.users;
  });

  return socket;
};
