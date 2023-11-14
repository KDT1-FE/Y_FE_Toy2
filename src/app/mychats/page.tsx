'use client';

import React, { useEffect, useState } from 'react';
import ChatPage from '@/components/chats/ChatPage';
import Navigation from '@/components/Navigation';

const MyChats = () => {
  const [isRightWay, setIsRightWay] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      setIsRightWay(true);
    } else {
      setIsRightWay(false);
    }
  }, []);

  if (!isRightWay) {
    return null;
  } else {
    return (
      <>
        <ChatPage userType="my" />
        <Navigation />
      </>
    );
  }
};

export default MyChats;
