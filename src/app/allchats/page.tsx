'use client';

import Navigation from '@/components/Navigation';
import ChatPage from '@/components/chats/ChatPage';
import { useEffect, useState } from 'react';

const AllChats = () => {
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
        <ChatPage userType="all" />
        <Navigation />
      </>
    );
  }
};

export default AllChats;
