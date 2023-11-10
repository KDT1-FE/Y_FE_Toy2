import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../@types/types';
import { CLIENT_URL } from '../../apis/constant';

export default function Chat() {
   // chatId랑 accessToken받아서 사용하기
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const socketRef = useRef<Socket | null>(null);

  const chatId = '43c7d302-1005-4a55-b12c-3f6d30c4755c';

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiN2ZiMTExZTp1c2VyMyIsImlhdCI6MTY5OTUzMzExMiwiZXhwIjoxNzAwMTM3OTEyfQ.4eslctzcBGQAwkcKT97IbF0i-9-MZ0kvhjY4A6sK8Wo';

  useEffect(() => {
    socketRef.current = io(`${CLIENT_URL}?chatId=${chatId}`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    });
    socketRef.current.on('message-to-client', (messageObject: Message) => {
      console.log(messageObject);
      setMessages(prevMessages => [...prevMessages, messageObject]);
    });

    return () => {
      socketRef.current?.off('connect');
      socketRef.current?.off('message-to-client');
      socketRef.current?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 이제 chatId와 accessToken이 변경될 때만 socket이 재생성됩니다.

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('message : ', message);
    console.log(socketRef.current);
     if (message && socketRef.current?.connected) {
      socketRef.current.emit('message-to-server', message);
      setMessage('');
    }
  };

  return (
    <>
      <div>Chat</div>
      <p>State: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map(msg => (
          <p key={msg.id}>
            {msg.userId}: {msg.text} -{' '}
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        ))}
      </div>
    </>
  );
}
