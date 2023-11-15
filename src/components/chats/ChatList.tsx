import { Box } from '@chakra-ui/react';
import Chat from '.';
import useChatList from '../../hooks/useChatList';
import ChatListSkeleton from './ChatListSkeleton';
import useScroll from '../../hooks/useScroll';
import { alertChatState } from '../../constants/chats';

const ChatList = ({ chatId }: { chatId: string }) => {
  const { chats, isLoading } = useChatList(chatId);
  const chatElement = useScroll(chats);

  return (
    <Box
      id="scrollableBox"
      maxWidth={750}
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
            userId={chat.userId}
            createdAt={chat.createdAt}
          />
        );
      })}
      {!isLoading && chats.length === 0 && <div>{alertChatState}</div>}
    </Box>
  );
};

export default ChatList;
