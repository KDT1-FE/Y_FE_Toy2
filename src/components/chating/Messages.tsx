'use client';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { socket } from '@/api/socketIo';

interface Message {
    id: string;
    text: string;
    userId: string; // 메세지를 보낸 사람의 id
    createdAt: string;
}

export default function Messages() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socketInitilizer();
    }, []);

    const socketInitilizer = () => {
        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.emit('fetch-messages');

        socket.on('messages-to-client', (messageObject) => {
            setMessages(messageObject.messages);
        });
    };

    console.log(messages);

    socket.on('message-to-client', (messageObject) => {
        setMessages([messageObject, ...messages]);
    });

    socket.emit('users');

    return (
        <MessagesContainer>
            {messages
                ? messages.map((message) => (
                      <MessageWrapper>
                          <MessageName>{message.userId}</MessageName>
                          <MessageText>{message.text}</MessageText>
                          <MessageTime>{message.createdAt}</MessageTime>
                      </MessageWrapper>
                  ))
                : ''}
        </MessagesContainer>
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

const MessageWrapper = styled.div`
    width: 100%;
`;

const MessageName = styled.div`
    font-size: 16px;
    color: #000;
`;

const MessageText = styled.div`
    width: 65%;

    margin-left: 60px;

    border-radius: 15px;
    border: 1px solid black;
`;

const MessagePicture = styled.img`
    width: 48px;
    height: 48px;
`;

const MessageTime = styled.div`
    color: #888;
`;
