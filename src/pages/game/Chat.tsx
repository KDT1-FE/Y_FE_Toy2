import React, { useEffect, useState } from 'react';
import ChatHeader from '../../components/ChatHeader';
import styles from '@styles/pages/chat.module.scss';
import ChatItem from '../../components/ChatItem';
import { Chat, ChatUser } from '../../types/ChatType';
import { Socket, io } from 'socket.io-client';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NDBiNDAxOmpqIiwiaWF0IjoxNjk5NzczMTE4LCJleHAiOjE3MDAzNzc5MTh9._4ZjpJd3u_4H3w7iSASY1V451_7yuaCt64d7is6scIM';
const serverId = '3440b401';
const chatId = '9f56bc05-f9d4-4964-a16c-0646ce96ffe4';

const ChatPage: React.FC = () => {
  const [currentPlayers, setCurrentPlayers] = useState<number>(6);
  const [totalPlayers, setTotalPlayers] = useState<number>(10);
  //
  const [chats, setChats] = useState<Chat[]>(chatItemData);
  const [inputText, setInputText] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 소켓 연결 설정
    const newSocket: Socket = io(
      'https://fastcampus-chat.net/chat?chatId=' + chatId,
      {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
          serverId: serverId,
        },
      },
    );

    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleStartGame = (): void => {
    // 게임 시작 로직 추가
    console.log('게임이 시작되었습니다!');
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      return;
    }
    const tempUser: ChatUser = {
      imageUrl: '/moon.svg',
      nickname: '마피아',
    };

    const newChat: Chat = {
      id: chats.length + 1, // 새로운 채팅의 id를 기존 채팅 수에 1을 더함
      user: tempUser,
      text: inputText,
    };

    // 소켓을 통해 서버로 메세지 전송
    if (socket) {
      socket.emit('message-to-server', newChat.text);
    }

    setChats([...chats, newChat]);
    setInputText(''); // 입력값 초기화
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.chat}>
      <ChatHeader
        currentPlayers={currentPlayers}
        totalPlayers={totalPlayers}
        onStartGame={handleStartGame}
      />
      {chats.map((chatItem) => (
        <ChatItem key={chatItem.id} user={chatItem.user} text={chatItem.text} />
      ))}

      <form onSubmit={handleSumbit}>
        <input type="text" value={inputText} onChange={handleChange}></input>
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatPage;

const chatItemData: Chat[] = [
  {
    id: 1,
    user: { imageUrl: '/ghost1.svg', nickname: 'user1' },
    text: '너도 마피아를 하러왔구나이!!',
  },
  {
    id: 2,
    user: { imageUrl: '/moon.svg', nickname: 'user2' },
    text: '너도 마피아를 하러왔구나?',
  },
];
