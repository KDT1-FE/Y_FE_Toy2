import { Box, Flex, Text } from '@chakra-ui/react';
import ChatList from '../../components/chats/ChatList';
import ChatInput from '../../components/chats/ChatInput';
import ChannelMemberSideBar from '../../components/channelMemberSideBar';

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
        <Box flex="1" h="100vh">
          <ChannelMemberSideBar />
        </Box>
      </Flex>
    </Box>
  );
};

export default Chats;
