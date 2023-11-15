import React, { useState, useEffect, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilValue } from 'recoil';
import MyChat from '@/components/chat/mychat';
import OtherChat from '@/components/chat/otherchat';
import EntryNotice from '@/components/chat/entryNotice';
import ExitNotice from '@/components/chat/exitNotice';
import ChatAlert from '@/components/chat/chatAlert';
import { JoinersData, LeaverData, Message } from '@/@types/types';
import { useRouter } from 'next/router';
import { userIdState } from '@/recoil/atoms/userIdState';
import { getStorage } from '@/utils/loginStorage';
import { chatSocket } from '@/apis/socket';
import { CLIENT_URL } from '../../apis/constant';
import styles from './Chat.module.scss';
import styles2 from '../../components/chat/Chat.module.scss';
import ChatroomHeader from '../../components/chat/header';

export default function Chat() {
  const router = useRouter();
  const { chatId, name } = router.query;

  const [, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userId = useRecoilValue(userIdState);

  const accessToken = getStorage('accessToken');

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to chat server');
  //     setIsConnected(true);
  //   });

  //   socket.on('messages-to-client', (messageArray: Message[]) => {
  //     setMessages(messageArray.messages);
  //   });

  //   socket.on('message-to-client', (messageObject: Message) => {
  //     setMessages(prevMessages => [...prevMessages, messageObject]);
  //   });

  //   socket.emit('fetch-messages');

  //   socket.on('join', (messageObject: JoinersData) => {
  //     console.log(messageObject, '123123123');
  //   });

  //   socket.on('leave', (messageObject: LeaverData) => {
  //     console.log(messageObject, '123123123');
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('messages-to-client');
  //     socket.off('message-to-client');
  //     socket.off('join');
  //     socket.off('leave');
  //     socket.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chatId]); // 이제 chatId와 accessToken이 변경될 때
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    if (typeof chatId === 'string') {
      try {
        const newSocket = chatSocket(accessToken, chatId);
        setSocket(newSocket);

        newSocket.on('messages-to-client', messageData => {
          console.log('Fetched messages:', messageData.messages);
          setMessages(messageData.messages);
        });

        newSocket.on('message-to-client', messageObject => {
          setMessages(prevMessages => [...prevMessages, messageObject]);
          console.log(messageObject);
        });

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
  }, [chatId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message.trim()) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    socket.emit('message-to-server', message);
    setMessage('');
  };

  return (
    <>
      <ChatroomHeader name={name} chatId={chatId} />
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            {messages.map(msg =>
              msg.userId === userId ? (
                <MyChat key={msg.id} msg={msg} />
              ) : (
                <OtherChat key={msg.id} msg={msg} />
              ),
            )}
            <EntryNotice />
            <ExitNotice />
          </div>
          <div ref={messagesEndRef} />
          {showAlert && <ChatAlert />}
        </div>
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
    </>
  );
}