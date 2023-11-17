'use client';

import Navigation from '@/components/Navigation';
import ChatPage from '@/components/chats/ChatPage';
import { useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookie';

const AllChats = () => {
  const [isRightWay, setIsRightWay] = useState<boolean>(false);

  useEffect(() => {
    const isUserAccess = getCookie('accessToken');

    if (isUserAccess) {
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
