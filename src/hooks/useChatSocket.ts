// useSocket.js
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { chattingIdState } from '../states/atom';
import { chatSocket } from '../api/socket';
import { disconnectLoginSocket } from '../api/socket';
import { getCookie } from '../util/util';

export const useChatSocket = () => {
  const accessToken = getCookie('accessToken');
  const [chatId, setChatId] = useRecoilState(chattingIdState);

  useEffect(() => {
    if (accessToken && chatId) {
      console.log('useChatSocket 커스텀훅 발동!');
      chatSocket(accessToken, chatId);
    }

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      disconnectLoginSocket();
      // 소켓 연결 해제 로직 추가
    };
  }, [accessToken, chatId]);

  return useChatSocket;
};
