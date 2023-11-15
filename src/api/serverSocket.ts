import { io } from 'socket.io-client';

const serverSocket = io(`${process.env.REACT_APP_API_URL}/server`, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default serverSocket;
