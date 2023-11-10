import React, { useState, useEffect } from 'react';
import MyChat from '@/components/chat/mychat';
import OtherChat from '@/components/chat/otherchat';
import socket from '../../apis/socket';
import styles from './Chat.module.scss';
import ChatroomHeader from '../../components/chat/header';
import ChatroomFooter from '../../components/chat/footer';

interface Message {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id

  createdAt: Date;
}

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState(''); // 사용자가 입력하는 메시지
  const [messages, setMessages] = useState<Message[]>([]); // 모든 메시지를 저장하는 배열

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // 연결 성공 시 콘솔에 메시지를 출력합니다.
    socket.on('connect', () => {
      console.log('Connected to the chat server');
    });

    // 서버로부터 메시지를 받았을 때 처리
    socket.on('message-to-client', (messageObject: Message) => {
      setMessages(prevMessages => [...prevMessages, messageObject]);
    });

    // 컴포넌트가 언마운트될 때 소켓 리스너를 정리합니다.
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message-to-client');
    };
  }, []);

  // 폼 제출 핸들러
  // const handleSendMessage = (event: React.FormEvent) => {
  //   event.preventDefault(); // 기본 폼 제출 동작 방지
  //   socket.emit('message-to-server', message); // 메시지 전송
  //   setMessage(''); // 메시지 상태 초기화
  // };

  return (
    <div className={styles.container}>
      <ChatroomHeader />
      {/* <p>State: + {isConnected}</p> */}
      {/* <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form> */}
      <div>
        <OtherChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <OtherChat />
        <MyChat />
        <MyChat />
        {/* {messages.map((msg, index) => (
          <p key={index}>
            {msg.userId}: {msg.text} -{' '}
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        ))} */}
      </div>
      <ChatroomFooter />
    </div>
  );
}
