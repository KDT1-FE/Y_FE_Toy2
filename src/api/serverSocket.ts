import { io } from 'socket.io-client';

const serverSocket = io(`${process.env.REACT_APP_API_URL}/server`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default serverSocket;
