'use client';

import React, { useEffect, useState } from 'react';
import ChatPage from '@/components/chats/ChatPage';

const AllChats = () => {
    return <ChatPage userType="all" />;
};

export default AllChats;
