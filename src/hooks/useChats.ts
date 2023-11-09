import { useQuery } from '@tanstack/react-query';
import { Chat } from '../components/cardContainer/card.types';

const useChats = () => {
  return useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch('https://fastcampus-chat.net/chat/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN || ''}`,
          serverId: process.env.REACT_APP_SERVER_ID || '',
        },
      });

      const data = await response.json();

      return data.chats;
    },
  });
};

export default useChats;
