import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ChatHeader from '@/components/ChatHeader';
import GameHeader from '@components/common/GameHeader';
import styles from '@styles/pages/chat.module.scss';
import ChatItem from '../../components/ChatItem';
import { Socket, io } from 'socket.io-client';
import { useAppSelector } from '@/hooks/redux';

const accessToken = localStorage.getItem('access_token');
const serverId = import.meta.env.VITE_FAST_KEY;

const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const pocketId = searchParams.get('pocketId');
  const navigate = useNavigate();

  const role = searchParams.get('role');

  const [currentPlayers, setCurrentPlayers] = useState<number>(1);
  const [totalPlayers, setTotalPlayers] = useState<number>(4);
  const userId = useAppSelector((state) => state.userId);

  const [chats, setChats] = useState<ResponseData[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

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

    newSocket.on('join', (res) => {
      console.log(res.users);
      console.log(res.users.length);

      if (res.users.length === 4) {
        setTimeout(() => {
          navigate(`/role?chatId=${chatId}&pocketId=${pocketId}`);
        }, 3000);
      }
      setCurrentPlayers(res.users.length);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket)
      socket.on('join', (res) => {
        console.log(res.users);
      });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message-to-client', (messageObject) => {
        setChats((prev) => [...prev, messageObject]);
      });
    }
  }, [socket]);

  const handleStartGame = (): void => {
    // 게임 시작 로직 추가
    console.log('게임이 시작되었습니다!');
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      return;
    }

    // 소켓을 통해 서버로 메세지 전송
    if (socket) {
      socket.emit('message-to-server', inputText);
    }
    setInputText(''); // 입력값 초기화
  };

  useEffect(() => {
    console.log('Updated Chats:', chats);
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.chat}>
      {role ? (
        <GameHeader
          timer={210}
          title={`당신의 직업은 "${role}" 입니다.`}
          next="vote"
          chatId={chatId}
          pocketId={pocketId}
        />
      ) : (
        <ChatHeader
          currentPlayers={currentPlayers}
          totalPlayers={totalPlayers}
          onStartGame={handleStartGame}
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
