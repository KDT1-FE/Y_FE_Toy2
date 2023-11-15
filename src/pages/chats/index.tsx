import { Box, Flex, Text } from '@chakra-ui/react';
import ChatList from '../../components/chats/ChatList';
import ChatInput from '../../components/chats/ChatInput';
import ChannelMemberSideBar from '../../components/channelMemberSideBar';
import { useNavigate, useParams } from 'react-router';

const Chats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) return <></>;
  return (
    <Flex>
      <Box flex="3" h="100vh">
        <Flex
          alignItems="center"
          borderBottom="1px solid #E2E8F0"
          w="full"
          h="44px"
        >
          <Text
            fontSize="1rem"
            fontWeight={600}
            cursor="pointer"
            onClick={() => {
              navigate('/');
            }}
          >
            전체 채팅방 보러가기
          </Text>
        </Flex>
        <Box>
          <ChatList chatId={id} />
          <ChatInput chatId={id} />
        </Box>
      </Box>
      <Box flex="1" h="100vh">
        <ChannelMemberSideBar />
      </Box>
    </Flex>
  );
};

export default Chats;
