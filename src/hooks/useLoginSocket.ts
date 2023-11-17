// useSocket.js
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../states/atom';
import { loginSocket } from '../api/socket';
import { disconnectLoginSocket } from '../api/socket';
import { getCookie } from '../util/util';

export const useLoginSocket = () => {
  const accessToken = getCookie('accessToken');
  const [, setOnlineUsers] = useRecoilState(onlineUserState);

  useEffect(() => {
    if (accessToken) {
      loginSocket(accessToken, (data) => {
        setOnlineUsers(data); // Recoil 상태 업데이트
      });
    }

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      disconnectLoginSocket();
      // 소켓 연결 해제 로직 추가
    };
  }, [accessToken, setOnlineUsers]);

  return useLoginSocket;
};
