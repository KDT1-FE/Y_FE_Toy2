import { Box, Flex, Text } from '@chakra-ui/react';
import ChatList from '../../components/chats/ChatList';
import ChatInput from '../../components/chats/ChatInput';

const Chats = () => {
  return (
    <Box flex="1">
      <Flex>
        <Box flex="3" h="100vh">
          <Flex
            alignItems="center"
            borderBottom="1px solid #E2E8F0"
            w="full"
            h="44px"
          >
            <Text fontSize="1rem" fontWeight={600}>
              3번 채팅방
            </Text>
          </Flex>
          <Box>
            <ChatList />
            <ChatInput />
          </Box>
        </Box>
        <Box flex="1" bg="yellow" h="100vh">
          유저 친구 목록
        </Box>
      </Flex>
    </Box>
  );
};

export default Chats;
