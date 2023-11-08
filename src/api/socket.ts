import { SERVER_ID, CONTENT_TYPE, SERVER_URL } from '../constant';
import io from 'socket.io-client';
export const socketLogin = (accessToken: string) => {
  const socket = io(`${SERVER_URL}/server`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });
  return socket;
};
