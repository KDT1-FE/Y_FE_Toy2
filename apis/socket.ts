import { io } from 'socket.io-client';

const chatId = 'a6bb7369-8abe-4773-84a3-f8b69aea621b';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlwiY2I3ZmIxMTFlXCI6Y2hhdCIsImlhdCI6MTY5OTQxMTM1NCwiZXhwIjoxNzAwMDE2MTU0fQ.j_J5xPhZujovSaGpiVLhqoGVUHIQwDuDxYgFqDLchBk';

const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default socket;
