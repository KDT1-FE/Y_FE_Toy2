'use client';

import React, { useState } from 'react';
import ChatPage from '@/components/chats/ChatPage';
import Navigation from '@/components/Navigation';

const MyChats = () => {
    const userId = sessionStorage.getItem('userId');
    return (
        <>
            <ChatPage userType="my" />
            <Navigation />
        </>
    );
};

export default MyChats;
