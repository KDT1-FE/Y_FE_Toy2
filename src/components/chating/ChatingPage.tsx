'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import MessageContainer from './MessageContainer';
import io from 'socket.io-client';
import { useRouter, usePathname } from 'next/navigation';
import ChatingNavigation from './ChatingNavigation';
import ChatingModal from './ChatingModal';
import { formatCreatedAt } from '../chats/useFormatCreatedAt';
import { instance } from '@/lib/api';
import { getCookie } from '@/lib/cookie';

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date; // Date
}

interface User {
  username: string;
  id: string;
  picture: string;
}

export default function ChatingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [chatName, setChatName] = useState<string>('');
  const [getUserToggle, setGetUserToggle] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const pathname = usePathname();
  const chatId = pathname.split('/')[2];
  const accessToken = getCookie('accessToken');
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    getUsers();
  }, [getUserToggle]);

  useEffect(() => {
    const FetchMessagesInterval: any = setInterval(() => {
      console.log(1);
      socket.emit('fetch-messages');
    }, 2000);
    try {
      socket.on('connect', () => {
        console.log('Socket connected');
        FetchMessagesInterval();
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });

      socket.on('messages-to-client', (messageObject) => {
        setLoading(false);

        console.log(messageObject);
        setMessages(messageObject.messages.reverse());
        clearInterval(FetchMessagesInterval);
      });

      socket.on('message-to-client', (messageObject) => {
        setMessages((prevMessages) => [messageObject, ...prevMessages]);
      });

      socket.on('join', (data) => {
        console.log(data, 'join');
        setGetUserToggle(!getUserToggle);
      });

      socket.on('leave', (data) => {
        console.log(data, 'leave');
        setGetUserToggle(!getUserToggle);
      });
      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
    },
  });

  // const getUsers = async () => {
  //   const response = await fetch(`https://fastcampus-chat.net/chat/only?chatId=${chatId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${accessToken}`,
  //       serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);

  //   setChatName(data.chat.name);
  //   setUsers(data.chat.users);
  // };

  const getUsers = async () => {
    try {
      let res = await instance.get<unknown, any>(`https://fastcampus-chat.net/chat/only?chatId=${chatId}`);
      const data = await res;
      console.log(data);

      setChatName(data.chat.name);
      setUsers(data.chat.users);
    } catch (error) {
      console.log(error);
    }
  };

  const findUserName = (userId: string): string | undefined => {
    for (let i = 0; i < users.length; i++) {
      if (userId == users[i].id) {
        return users[i].username;
      }
    }
    return undefined;
  };

  const findUserPicture = (userId: string): string | undefined => {
    for (let i = 0; i < users.length; i++) {
      if (userId == users[i].id) {
        return users[i].picture;
      }
    }
    return undefined;
  };

  return (
    <main>
      <ChatingNavigation chatName={chatName} />
      <ChatingModal users={users} chatId={chatId} />
      {loading && <Loading />}

      <MessagesContainer>
        {messages
          ? messages.map((message: Message, i: number) =>
              userId == message.userId || userId == message.userId ? (
                <MyMessageWrapper key={message.id}>
                  <MyMessageText>{message.text}</MyMessageText>
                  <MyMessageTime>{formatCreatedAt(message.createdAt)}</MyMessageTime>
                </MyMessageWrapper>
              ) : messages[i].userId == messages[i + 1]?.userId || messages[i].userId == messages[i + 1]?.userId ? (
                <YourMessageWrapper key={message.id}>
                  <YourMessageTextWrapper>
                    <YourMessageText>{message.text}</YourMessageText>
                    <YourMessageTime>{formatCreatedAt(message.createdAt)}</YourMessageTime>
                  </YourMessageTextWrapper>
                </YourMessageWrapper>
              ) : (
                <YourMessageWrapper key={message.id}>
                  <YourMessageNameWrapper>
                    <YourMessagePicture
                      src={
                        findUserPicture(message.userId) ||
                        'https://gravatar.com/avatar/0211205be1e2bce90bbe53c5e0d8aaff?s=200&d=retro'
                      }
                    />
                    <YourMessageName>{findUserName(message.userId) || message.userId}</YourMessageName>
                  </YourMessageNameWrapper>
                  <YourMessageTextWrapper>
                    <YourMessageText>{message.text}</YourMessageText>
                    <YourMessageTime>{formatCreatedAt(message.createdAt)}</YourMessageTime>
                  </YourMessageTextWrapper>
                </YourMessageWrapper>
              ),
            )
          : ''}
      </MessagesContainer>
      <MessageContainer socket={socket} />
    </main>
  );
}

const MessagesContainer = styled.div`
  width: 100%;
  height: 100vh;

  padding-bottom: 83px;
  background-color: #eee;

  display: flex;
  flex-direction: column-reverse;

  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const YourMessageWrapper = styled.div`
  width: 100%;
`;

const YourMessageNameWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const YourMessageName = styled.div`
  font-size: 24px;
  color: #000;

  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const YourMessagePicture = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 20px;
`;

const YourMessageTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-bottom: 10px;
`;
const YourMessageText = styled.div`
  max-width: 75%;
  padding: 10px;

  margin-left: 40px;

  font-size: 16px;

  border-radius: 15px;

  background-color: #d9d9d9;
`;

const YourMessageTime = styled.div`
  color: #888;
  font-size: 12px;

  margin-left: 5px;

  display: flex;
  flex-direction: column-reverse;
`;

const MyMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;

const MyMessageText = styled.div`
  max-width: 75%;
  padding: 10px;

  margin-right: 10px;

  font-size: 16px;

  border-radius: 15px;

  background-color: #00956e;
`;

const MyMessageTime = styled.div`
  color: #888;
  font-size: 12px;

  margin-right: 5px;

  display: flex;
  flex-direction: column-reverse;
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50px;
  height: 50px;

  border: 5.5px solid rgba(255, 255, 255, 0.3);
  border-top: 5.5px solid ${({ theme }) => theme.color.mainGreen};
  border-radius: 50%;

  animation: spin 1s linear infinite;

  margin: 8rem auto 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
