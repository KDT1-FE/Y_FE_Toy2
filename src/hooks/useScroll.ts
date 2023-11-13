import { useEffect, useRef } from 'react';
import { ChatInfo } from '../@types/message';

const useScroll = (chats: ChatInfo[]) => {
  const chatElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chatElement.current) return;
    chatElement.current.scrollTo({
      behavior: 'smooth',
      top: chatElement.current.scrollHeight,
    });
  }, [chats]);
  return chatElement;
};

export default useScroll;
