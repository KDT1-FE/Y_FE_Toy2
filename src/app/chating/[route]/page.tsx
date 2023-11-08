'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import MessageContainer from '@/components/chating/MessageContainer';
import io from 'socket.io-client';
import { usePathname } from 'next/navigation';

interface Message {
    id: string;
    text: string;
    userId: string;
    createdAt: string; // Date?
}

export default function Chating() {
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
    };

    console.log(messages, '4');
    console.log(userId);

    return (
        <main>
            <MessagesContainer>
                {messages
                    ? messages.map((message: Message, i: number) =>
                          userId == message.userId.split(':')[1] || userId == message.userId.split(':')[0] ? (
                              <MyMessageWrapper key={message.id}>
                                  <MyMessageText>{message.text}</MyMessageText>
                                  <MyMessageTime>{message.createdAt}</MyMessageTime>
                              </MyMessageWrapper>
                          ) : messages[i].userId == messages[i + 1]?.userId ||
                            messages[i].userId == messages[i + 1]?.userId.split(':')[1] ? (
                              <YourMessageWrapper key={message.id}>
                                  <YourMessageText>{message.text}</YourMessageText>
                                  <YourMessageTime>{message.createdAt}</YourMessageTime>
                              </YourMessageWrapper>
                          ) : (
                              <YourMessageWrapper key={message.id}>
                                  <YourMessageName>
                                      {message.userId.split(':')[message.userId.split(':').length - 1]}
                                  </YourMessageName>
                                  <YourMessageText>{message.text}</YourMessageText>
                                  <YourMessageTime>{message.createdAt}</YourMessageTime>
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

const YourMessageName = styled.div`
    font-size: 24px;
    color: #000;
`;

const YourMessageText = styled.div`
    width: 75%;
    padding: 10px;

    margin-left: 30px;

    font-size: 16px;

    border-radius: 15px;

    background-color: #d9d9d9;
`;

const YourMessagePicture = styled.img`
    width: 48px;
    height: 48px;
`;

const YourMessageTime = styled.div`
    color: #888;
    margin-left: 40px;
`;

const MyMessageWrapper = styled.div`
    width: 100%;
`;

const MyMessageText = styled.div`
    width: 75%;
    padding: 10px;

    float: right;
    margin-right: 10px;

    font-size: 16px;

    border-radius: 15px;

    background-color: #00956e;
`;

const MyMessagePicture = styled.img`
    width: 48px;
    height: 48px;
`;

const MyMessageTime = styled.div`
    color: #888;

    float: right;
    margin-right: 30px;
`;
