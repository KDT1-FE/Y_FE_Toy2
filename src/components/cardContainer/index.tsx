import { HStack } from '@chakra-ui/react';
import useChats from '../../hooks/useChats';
import UserCard from './Card';

const CardContainer = () => {
  const { data: chats, isLoading } = useChats();

  if (isLoading) return <div>Loading...</div>;

  if (chats && chats.length === 0) return <div>채팅방이 없습니다.</div>;

  return <HStack>{chats && chats.map((chat) => <UserCard key={chat.id} chat={chat} />)}</HStack>;
};

export default CardContainer;
