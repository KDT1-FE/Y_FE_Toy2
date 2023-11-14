import { io } from 'socket.io-client';

const chatId = 'fb4de663-7142-4924-b7b2-9159bf2d8a31';

const serverSocket = io(`${process.env.REACT_APP_API_URL}/server`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default serverSocket;
