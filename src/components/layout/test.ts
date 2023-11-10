import { SERVER_ID, SERVER_URL } from '../../constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, privateChatDetail } from '../../states/atom';
import { io } from 'socket.io-client';

export const test = () => {
  const chatId = 'e9db7846-5733-4aeb-aa8c-7457c8479748'; // 채팅방 ID
  const accessToken: any = useRecoilValue(accessTokenState);

  // 클라이언트 소켓 생성
  const socket = io(`${SERVER_URL}/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID, // 서버 ID
    },
  });

  // 클라이언트에서 서버로 메시지 전송 (emit)
  socket.emit('message-to-server', 'Hello, Server!');

  // 서버에서 클라이언트로 메시지 수신 (on)
  socket.on('message-to-client', (messageObject) => {
    console.log('Message from server:', messageObject);
  });

  // 소켓 연결이 끊어졌을 때 처리
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  // 예제로 fetch-messages 이벤트를 발생시키고, 서버에서 받은 메시지를 콘솔에 출력
  socket.emit('fetch-messages');

  socket.on('messages-to-client', (messageData) => {
    console.log('Fetched messages:', messageData);
  });
};
