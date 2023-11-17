import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatHeader from '@/components/chat/ChatHeader';
import GameHeader from '@components/common/GameHeader';
import styles from '@styles/pages/chat.module.scss';
import ChatItem from '../../components/chat/ChatItem';
import { Socket, io } from 'socket.io-client';
import fastRequest from '@/api/fastRequest';

const accessToken = localStorage.getItem('access_token');
const serverId = import.meta.env.VITE_FAST_KEY;

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<ResponseData[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const pocketId = searchParams.get('pocketId');

  const role = searchParams.get('role');
  const [currentPlayers, setCurrentPlayers] = useState<number>(0);

  const setInitialNum = async () => {
    try {
      const chatInfo = await fastRequest.searchChat(
        chatId as string,
        accessToken as string,
      );
      setCurrentPlayers(chatInfo.chat.users.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newSocket: Socket = io(
      `https://fastcampus-chat.net/chat?chatId=${chatId}`,
      {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
          serverId: serverId,
        },
      },
    );
    setSocket(newSocket);
    setInitialNum();

    newSocket.on('join', (res) => {
      setCurrentPlayers(res.users.length);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message-to-client', (messageObject) => {
        setChats((prev) => [...prev, messageObject]);
      });
    }
  }, [socket]);

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    if (socket) {
      socket.emit('message-to-server', inputText);
    }
    setInputText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className={styles.chat}>
      {currentPlayers === 4 ? (
        <GameHeader
          timer={210}
          title={`당신의 직업은 "${
            role === 'mafia' ? '마피아' : '시민'
          }" 입니다.`}
          next="vote"
          chatId={chatId}
          pocketId={pocketId}
        />
      ) : (
        <ChatHeader
          currentPlayers={currentPlayers}
          totalPlayers={4}
          chatId={chatId}
          pocketId={pocketId}
        />
      )}
      <div className={styles.chatEx}>
        <div className={styles.chatItems}>
          {chats.map((chatItem) => (
            <ChatItem
              key={chatItem.id}
              chatingUserId={chatItem.userId}
              text={chatItem.text}
            />
          ))}

          <div ref={messageEndRef}></div>
        </div>

        <form className={styles.form} onSubmit={handleSumbit}>
          <input
            className={styles.input}
            placeholder="텍스트를 입력해주세요"
            type="text"
            value={inputText}
            onChange={handleChange}></input>
          <button className={styles.button}>전송</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

export interface ResponseData {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id
  createdAt: Date;
}
