import React, { useState } from 'react';
import ChatHeader from '../../components/ChatHeader';
import styles from '@styles/pages/chat.module.scss';
import ChatItem from '../../components/ChatItem';
import { Chat, ChatUser } from '../../types/ChatType';

const ChatPage: React.FC = () => {
  const [currentPlayers, setCurrentPlayers] = useState<number>(6);
  const [totalPlayers, setTotalPlayers] = useState<number>(10);
  //
  const [chats, setChats] = useState<Chat[]>(chatItemData);
  const [inputText, setInputText] = useState<string>('');

  const handleStartGame = (): void => {
    // 게임 시작 로직 추가
    console.log('게임이 시작되었습니다!');
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
      <input type="text" onChange={(e) => setInputText(e.target.value)}></input>

      <button
        onClick={() => {
          const tempUser: ChatUser = {
            imageUrl: '/ghost1.svg',
            nickname: '창현 ㅋㅋ',
          };
          const newChat: Chat = {
            id: chats.length,
            user: tempUser,
            text: inputText,
          };
          setChats([...chats, newChat]);
        }}>
        전송
      </button>
    </div>
  );
};

export default ChatPage;

const chatItemData: Chat[] = [
  {
    id: 1,
    user: { imageUrl: '/ghost1.svg', nickname: 'user1' },
    text: '너도 마피아를 하러왔구ㄴㅇㄹㅇㄹㅇ라어',
  },
  {
    id: 2,
    user: { imageUrl: '/moon.svg', nickname: 'user2' },
    text: '너도 마피아를 하러왔구나?',
  },
];
