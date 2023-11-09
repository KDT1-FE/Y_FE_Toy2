'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import MessageContainer from './MessageContainer';
import io from 'socket.io-client';
import { usePathname } from 'next/navigation';
import { formatCreatedAt } from '@/hooks/chatsList/useFormatCreatedAt';

interface Message {
    id: string;
    text: string;
    userId: string;
    createdAt: Date; // Date?
}

export default function ChatingPage() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socketInitilizer();
    }, []);

    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('userId');

    const pathname = usePathname();
    const chatId = pathname.split('/')[2];

    const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
        extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
            serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
        },
    });

    const socketInitilizer = () => {
        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.emit('fetch-messages');

        socket.on('messages-to-client', (messageObject) => {
            setMessages(messageObject.messages);
        });

        socket.on('message-to-client', (messageObject) => {
            setMessages((prevMessages) => [messageObject, ...prevMessages]);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        // socket.emit('users');

        // socket.on('users-to-client', (data) => {
        //     console.log(data, 'users-to-client');
        // });

        socket.on('join', (data) => {
            console.log(data, 'join');
        });
        socket.on('leave', (data) => {
            console.log(data, 'leave');
        });
    };

    return (
        <main>
            <MessagesContainer>
                {messages
                    ? messages.map((message: Message, i: number) =>
                          userId == message.userId.split(':')[1] || userId == message.userId.split(':')[0] ? (
                              <MyMessageWrapper key={message.id}>
                                  <MyMessageText>{message.text}</MyMessageText>
                                  <MyMessageTime>{formatCreatedAt(message.createdAt)}</MyMessageTime>
                              </MyMessageWrapper>
                          ) : messages[i].userId == messages[i + 1]?.userId ||
                            messages[i].userId == messages[i + 1]?.userId.split(':')[1] ? (
                              <YourMessageWrapper key={message.id}>
                                  <YourMessageTextWrapper>
                                      <YourMessageText>{message.text}</YourMessageText>
                                      <YourMessageTime>{formatCreatedAt(message.createdAt)}</YourMessageTime>
                                  </YourMessageTextWrapper>
                              </YourMessageWrapper>
                          ) : (
                              <YourMessageWrapper key={message.id}>
                                  <YourMessageNameWrapper>
                                      <YourMessagePicture src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                                      <YourMessageName>
                                          {message.userId.split(':')[message.userId.split(':').length - 1]}
                                      </YourMessageName>
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
