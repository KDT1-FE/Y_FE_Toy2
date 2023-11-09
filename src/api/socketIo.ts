import io from 'socket.io-client';

const chatId = '7aaf3ab8-d85d-4441-b770-dcaac583eba6';

export const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QxMCIsImlhdCI6MTY5OTI4NDYzNSwiZXhwIjoxNjk5ODg5NDM1fQ.DWlYHCXfZd8UEBP2z-Xqlvzvx1cjYYlW_TAcPyPjfAA',
        serverId: '53b9f98a',
    },
});
