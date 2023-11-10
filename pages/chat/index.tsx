import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import MyChat from '@/components/chat/mychat';
import OtherChat from '@/components/chat/otherchat';
import { Message } from '@/@types/types';
import { CLIENT_URL } from '../../apis/constant';
import styles from './Chat.module.scss';
import styles2 from '../../components/chat/Chat.module.scss';
import ChatroomHeader from '../../components/chat/header';

export default function Chat() {
  const [, setIsConnected] = useState(false);
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
  }, []); // 이제 chatId와 accessToken이 변경될 때 

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message && socketRef.current?.connected) {
      socketRef.current.emit('message-to-server', message);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <ChatroomHeader />
      <div>
        {messages.map(msg => (
          <MyChat key={msg.id} msg={msg} />
        ))}
      </div>

      <form className={styles2.footer} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="대화를 시작해보세요!"
          className={styles2.chatInput}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className={styles2.triangle_button}
          type="submit"
          aria-label="Submit"
        />
      </form>
    </div>
  );
}
