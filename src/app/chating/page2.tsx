'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const chatId = '7aaf3ab8-d85d-4441-b770-dcaac583eba6';

export default function Chating() {
    const [message, setMessage] = useState<string>('');

    const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
        extraHeaders: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QxMCIsImlhdCI6MTY5OTI4NDYzNSwiZXhwIjoxNjk5ODg5NDM1fQ.DWlYHCXfZd8UEBP2z-Xqlvzvx1cjYYlW_TAcPyPjfAA',
            serverId: '53b9f98a',
        },
    });

    socket.on('connect', () => {
        console.log('Socket connected');
    });
    socket.on('message-to-client', (messageObject) => {
        console.log(messageObject);
    });

    return (
        <main>
            <div>1</div>
        </main>
    );
}
