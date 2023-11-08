import { io } from 'socket.io-client';

const chatId = 'd64279b3-dd2f-4a34-a242-4f5ec11f70d8';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlwiY2I3ZmIxMTFlXCI6Y2hhdCIsImlhdCI6MTY5OTQxMTM1NCwiZXhwIjoxNzAwMDE2MTU0fQ.j_J5xPhZujovSaGpiVLhqoGVUHIQwDuDxYgFqDLchBk';

const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
  transports: ['polling', 'websocket'],
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default socket;
