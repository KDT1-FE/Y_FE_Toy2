'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Messages from '@/components/chating/Messages';
import MessageContainer from '@/components/chating/MessageContainer';
import { socket } from '@/api/socketIo';
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

    const pathname = usePathname();
    const chatId = pathname.split('/')[2];

    const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
        extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
            serverId: '53b9f98a',
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
    };

    socket.on('message-to-client', (messageObject) => {
        setMessages([messageObject, ...messages]);
    });

    socket.emit('users');

    return (
        <main>
            <Messages messages={messages} />
            <MessageContainer />
        </main>
    );
}
