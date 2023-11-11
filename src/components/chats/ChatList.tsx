import { Box } from '@chakra-ui/react';
import Chat from '.';
import useChatList from '../../hooks/useChatList';

const ChatList = () => {
  const chats = useChatList();
  return (
    <Box
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
    >
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
    </Box>
  );
};

export default ChatList;
