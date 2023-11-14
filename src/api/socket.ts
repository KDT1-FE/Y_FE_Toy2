import { io } from 'socket.io-client';

const chatId = 'fb4de663-7142-4924-b7b2-9159bf2d8a31';

const socket = io(`${process.env.REACT_APP_API_URL}/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default socket;
