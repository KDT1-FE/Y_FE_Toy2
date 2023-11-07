'use client';

import React, { useEffect } from 'react';
import io from 'socket.io-client';

export default function Chating() {
    useEffect(() => {
        socketInitilizer();
    }, []);

    async function socketInitilizer() {
        const socket = await io('https://fastcampus-chat.net', {
            path: '/chat',
            query: {
                chatId: '7aaf3ab8-d85d-4441-b770-dcaac583eba6',
            },
            extraHeaders: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
            },
            transports: ['websocket'],
        });
    }

    const SignUp = async () => {
        const response = await fetch('https://fastcampus-chat.net/signup', {
            method: 'POST',
            body: JSON.stringify({
                id: 'test09',
                password: '12345',
                name: 'test09',
                picture: 'https://avatars.githubusercontent.com/u/66263916?v=4',
            }),
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const LogIn = async () => {
        const response = await fetch('https://fastcampus-chat.net/login', {
            method: 'POST',
            body: JSON.stringify({
                id: 'test10',
                password: '12345',
            }),
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const Users = async () => {
        const response = await fetch('https://fastcampus-chat.net/users', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwOSIsImlhdCI6MTY5OTI4NDM2NywiZXhwIjoxNjk5ODg5MTY3fQ.NhoDlvb724HSCCnPg2vGIlv_BeNeOlsiv67C17UvZSE',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const CreateChat = async () => {
        const response = await fetch('https://fastcampus-chat.net/chat', {
            method: 'POST',
            body: JSON.stringify({
                name: 'testChat09',
                users: [
                    {
                        id: 'test09',
                        name: 'test09',
                        picture: 'https://gravatar.com/avatar/cba9a2c84d258bba340f336e2cd538ba?s=200&d=retro',
                    },

                    {
                        id: 'test10',
                        name: 'test10',
                        picture: 'https://gravatar.com/avatar/cba9a2c84d258bba340f336e2cd538ba?s=200&d=retro',
                    },
                ],
                isPrivate: false,
            }),
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwOSIsImlhdCI6MTY5OTI4NDM2NywiZXhwIjoxNjk5ODg5MTY3fQ.NhoDlvb724HSCCnPg2vGIlv_BeNeOlsiv67C17UvZSE',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const ChatAll = async () => {
        const response = await fetch('https://fastcampus-chat.net/chat/all', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwOSIsImlhdCI6MTY5OTI4NDM2NywiZXhwIjoxNjk5ODg5MTY3fQ.NhoDlvb724HSCCnPg2vGIlv_BeNeOlsiv67C17UvZSE',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const MyChat = async () => {
        const response = await fetch('https://fastcampus-chat.net/chat', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwOSIsImlhdCI6MTY5OTI4NDM2NywiZXhwIjoxNjk5ODg5MTY3fQ.NhoDlvb724HSCCnPg2vGIlv_BeNeOlsiv67C17UvZSE',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const ParticipateChat = async () => {
        const response = await fetch('https://fastcampus-chat.net/chat/participate', {
            method: 'PATCH',
            body: JSON.stringify({
                chatId: '7aaf3ab8-d85d-4441-b770-dcaac583eba6',
            }),
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QxMCIsImlhdCI6MTY5OTI4NDYzNSwiZXhwIjoxNjk5ODg5NDM1fQ.DWlYHCXfZd8UEBP2z-Xqlvzvx1cjYYlW_TAcPyPjfAA',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const LeaveChat = async () => {
        const response = await fetch('https://fastcampus-chat.net/chat/leave', {
            method: 'PATCH',
            body: JSON.stringify({
                chatId: '7aaf3ab8-d85d-4441-b770-dcaac583eba6',
            }),
            headers: {
                'content-type': 'application/json',
                serverId: '53b9f98a',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QxMCIsImlhdCI6MTY5OTI4NDYzNSwiZXhwIjoxNjk5ODg5NDM1fQ.DWlYHCXfZd8UEBP2z-Xqlvzvx1cjYYlW_TAcPyPjfAA',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <main>
            <div>채팅 페이지</div>
            <button>회원가입</button>
            <button onClick={LogIn}>로그인</button>
            <button onClick={Users}>모든 유저 조회</button>
            <button onClick={CreateChat}>채팅 생성</button>
            <button onClick={ChatAll}>모든 채팅 조회</button>
            <button onClick={MyChat}>나의 채팅 조회</button>
            <button onClick={ParticipateChat}>채팅 참여하기</button>
            <button onClick={LeaveChat}>채팅 나가기</button>
        </main>
    );
}
