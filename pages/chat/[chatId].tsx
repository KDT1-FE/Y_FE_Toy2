import React, { useState, useEffect, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilValue } from 'recoil';
import MyChat from '@/components/chat/mychat';
import OtherChat from '@/components/chat/otherchat';
import EntryNotice from '@/components/chat/entryNotice';
import ExitNotice from '@/components/chat/exitNotice';
import ChatAlert from '@/components/chat/chatAlert';
import { Chat, JoinersData, LeaverData, Message } from '@/@types/types';
import { useRouter } from 'next/router';
import { userIdState } from '@/recoil/atoms/userIdState';
import { getStorage } from '@/utils/loginStorage';
// import chatSocket from '@/apis/socket';
import { CLIENT_URL } from '../../apis/constant';
import styles2 from '../../components/chat/Chat.module.scss';
import ChatroomHeader from '../../components/chat/header';
import chatAPI from '../../apis/chatAPI';

export default function Chatting() {
  const router = useRouter();
  const { chatId } = router.query;

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [chatData, setChatData] = useState<Chat | null>();

  const [showEntryNotice, setShowEntryNotice] = useState(false);
  const [showExitNotice, setShowExitNotice] = useState(false);

  const [enterName, setEnterName] = useState<string>('');
  const [exitName, setExitName] = useState<string>('');

  const userId = useRecoilValue(userIdState);

  const accessToken = getStorage('accessToken');

  const socket = useMemo(() => {
    return io(`${CLIENT_URL}?chatId=${chatId}`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: process.env.NEXT_PUBLIC_API_KEY!,
      },
    });
  }, [chatId, accessToken]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await chatAPI.getChatInfo(chatId);
        const chatInfo: Chat = response.data.chat;
        setChatData(chatInfo);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    if (chatId) {
      fetchChatData();
    }
  }, [chatId]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected from server');
        setTimeout(() => {
          socket.emit('fetch-messages');
        }, 500);
      });
      socket.emit('fetch-messages');

      socket.on('messages-to-client', (messageArray: Message[]) => {
        setMessages(messageArray.messages);
      });

      socket.on('message-to-client', (messageObject: Message) => {
        setMessages(prevMessages => [...prevMessages, messageObject]);
      });

      socket.emit('fetch-messages');

      socket.on('join', async (messageObject: JoinersData) => {
        console.log(messageObject, '채팅방 입장');
        const joinUserInfo = await chatAPI.getUserInfo(
          messageObject.joiners[0]?.id.split(':')[1],
        );
        setEnterName(joinUserInfo.data.user.name);
      });

      socket.on('leave', async (messageObject: LeaverData) => {
        console.log(messageObject, '채팅방 퇴장');
        const response = await chatAPI.getUserInfo(messageObject.leaver);
        setExitName(response.data.user.name);
        setChatData(prevState => {
          user;
        });
      });
    }
    return () => {
      socket.off('connect');
      socket.off('messages-to-client');
      socket.off('message-to-client');
      socket.off('join');
      socket.off('leave');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]); // 이제 chatId와 accessToken이 변경될 때

  useEffect(() => {
    if (enterName) {
      setShowEntryNotice(true); // Show entry notice

      const entryTimer = setTimeout(() => {
        setShowEntryNotice(false); // Hide entry notice after 3 seconds
        setEnterName('');
      }, 10000);

      return () => clearTimeout(entryTimer);
    }
  }, [enterName]);

  useEffect(() => {
    if (exitName) {
      setShowExitNotice(true); // Show exit notice

      const exitTimer = setTimeout(() => {
        setShowExitNotice(false); // Hide exit notice after 3 seconds
        setExitName('');
      }, 3000);

      return () => clearTimeout(exitTimer);
    }
  }, [exitName]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, [messages, showEntryNotice, showExitNotice]);

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
      {chatData && <ChatroomHeader chatData={chatData} />}
      <div className={styles2.container}>
        <div className={styles2.container}>
          <div>
            {messages.map(msg =>
              msg.userId === userId ? (
                <MyChat key={msg.id} msg={msg} />
              ) : (
                <OtherChat key={msg.id} msg={msg} />
              ),
            )}
          </div>
          {showEntryNotice && <EntryNotice joiner={enterName} />}
          {showExitNotice && <ExitNotice leaver={exitName} />}
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
