import { SERVER_URL } from '@/apis/constant';
import { getStorage } from '@/utils/loginStorage';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export default function useConnectServerSocket() {
  const accessToken = getStorage('accessToken');

  const serverSocket = useMemo(() => {
    return io(`${SERVER_URL}`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: process.env.NEXT_PUBLIC_API_KEY!,
      },
    });
  }, [accessToken]);

  useEffect(() => {
    serverSocket.on('connect', () => {
      console.log('Connected from server socket');
    });
    serverSocket.on('error', error => {
      console.error('server socket 연결 중 error:', error);
    });
    serverSocket.on('disconnect', () => {
      console.log('Disconnected from server socket');
    });

    return () => {
      serverSocket.off('connect');
      serverSocket.off('error');
      serverSocket.disconnect();
    };
  }, [serverSocket]);

  return serverSocket;
}
