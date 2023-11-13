import { Box } from '@chakra-ui/react';
import Chat from '.';
import useChatList from '../../hooks/useChatList';
import ChatListSkeleton from './ChatListSkeleton';
import useScroll from '../../hooks/useScroll';

const ChatList = () => {
  const { chats, isLoading } = useChatList();
  const chatElement = useScroll(chats);

  return (
    <Box
      id="scrollableBox"
      maxWidth={700}
      m="0 auto"
      mt="5"
      h="85vh"
      pr="10"
      pl="5"
      pb="5"
      overflowX="auto"
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4',
          borderRadius: '4',
          backgroundColor: 'blackAlpha.100',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'blackAlpha.100',
        },
      }}
      ref={chatElement}
    >
      {isLoading &&
        Array(10)
          .fill(0)
          .map((_, index) => <ChatListSkeleton key={index} />)}
      {chats?.map((chat, index) => {
        return (
          <Chat
            key={index}
            text={chat.text}
            name={chat.name}
            picture={chat.picture}
            createdAt={chat.createdAt}
          />
        );
      })}
      {!isLoading && chats.length === 0 && (
        <div>아직 채팅방에 대화가 없습니다!</div>
      )}
    </Box>
  );
};

export default ChatList;
