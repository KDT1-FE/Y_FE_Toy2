'use client';

import React from 'react';
import ChatPage from '@/components/chats/ChatPage';
import Navigation from '@/components/Navigation';

const MyChats = () => {
    return (
        <>
            <ChatPage userType="my" />
            <Navigation />
        </>
    );
};

export default MyChats;
