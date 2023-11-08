import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Messages from '@/components/chating/Messages';
import MessageContainer from '@/components/chating/MessageContainer';
import { socket } from '@/api/socketIo';
import io from 'socket.io-client';

export default function Chating() {
    const chatId = 1;

    const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
        extraHeaders: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QxMCIsImlhdCI6MTY5OTI4NDYzNSwiZXhwIjoxNjk5ODg5NDM1fQ.DWlYHCXfZd8UEBP2z-Xqlvzvx1cjYYlW_TAcPyPjfAA',
            serverId: '53b9f98a',
        },
    });
    return (
        <main>
            <Messages />
            <MessageContainer />
        </main>
    );
}
