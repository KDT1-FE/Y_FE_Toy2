import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ChatCard from '../../components/chat/ChatCard';
import { accessTokenState } from '../../atoms';

function ChatList() {
  const [chatList, setChatList] = useState([]);
  // 로그인 후 바로 전역state에 accessToken 저장하도록 수정해야됨
  const setAccessToken = useSetRecoilState(accessTokenState);
  const accessToken: string | null = localStorage.getItem('accessToken');

  const chatAll = useCallback(async () => {
    const response = await fetch('https://fastcampus-chat.net/chat/all', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setChatList(data.chats);
  }, [accessToken]);

  useEffect(() => {
    chatAll();
    setAccessToken(accessToken);
  }, [chatAll, accessToken, setAccessToken]);

  return (
    <div>
      <button type="button" onClick={chatAll}>
        chatAll
      </button>
      <div>
        {chatList.map((chat, index) => (
          <ChatCard chat={chat} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
