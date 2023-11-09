// 'use client';

import Navigation from '@/components/Navigation';
import ChatPage from '@/components/chats/ChatPage';

const AllChats = () => {
    return (
        <>
            <ChatPage userType="all" />
            <Navigation />
        </>
    );
};

export default AllChats;
