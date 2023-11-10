import { Box } from '@chakra-ui/react';
import Chat from '.';
import { useEffect, useState } from 'react';
import socket from '../../api/socket';
import { ChatInfo, MessageData } from '../../@types/message';
import { SOCKET } from '../../constants/socket';
import { getUser } from '../../api/user';

const ChatList = () => {
  const [messages, setMessages] = useState<ChatInfo[]>([]);
  useEffect(() => {
    const getMessageInfo = async (messages: MessageData[]) => {
      const messagesData = [];
      for (const message of messages) {
        const { id, createdAt, text, userId } = message;
        const response = await getUser(userId.split(':')[1]);
        if (response) {
          const { name, picture } = response;
          messagesData.push({
            id,
            createdAt: createdAt.split('T')[0],
            text,
            name,
            picture,
          });
        }
      }
      setMessages(messagesData.reverse());
    };

    socket.emit(SOCKET.FETCH_MESSAGES);
    socket.on(
      SOCKET.MESSAGES_TO_CLIENT,
      ({ messages }: { messages: MessageData[] }) => {
        getMessageInfo(messages);
      },
    );
  }, []);
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
      {messages?.map((message) => {
        return (
          <Chat
            key={message.id}
            text={message.text}
            name={message.name}
            picture={message.picture}
            createdAt={message.createdAt}
          />
        );
      })}
    </Box>
  );
};

export default ChatList;
