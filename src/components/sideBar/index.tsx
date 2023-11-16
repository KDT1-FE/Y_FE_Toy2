import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Text,
  Divider,
  Heading,
  VStack,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/react';
import { EditIcon, ChatIcon } from '@chakra-ui/icons';
import MyChannelItem from './MyChannelItem';
import { useMyChannels } from '../../hooks/useMyChannels';
import { useInviteData } from '../../hooks/useInviteData';

const SideBar = () => {
  const [myChannels, setmyChannels] = useState([]);

  const { data: channels } = useMyChannels();
  const { myChannelList } = useInviteData();

  return (
    <Box position="fixed" color="black">
      <Flex>
        <Box flex="1" w="280px" h="100vh" bg="gray.50" p="6">
          <Heading my="2rem" size={'2xl'} color={'blue.400'}>
            smartalk
          </Heading>
          <Box color="#828C98" justifyContent="center">
            <ChakraLink as={ReactRouterLink} to="/" fontSize={'lg'}>
              <ChatIcon mr={2} />
              전체 채팅방 조회
            </ChakraLink>
          </Box>
          <Divider my={50} />
          <Box>
            <Heading size="md" mb="2rem">
              나의 채팅방
            </Heading>
            <Box h="50vh" overflowY={'auto'} overflowX={'hidden'}>
              {myChannelList || channels ? (
                (myChannelList || channels)?.map((channel) => (
                  <Flex key={channel.id}>
                    <MyChannelItem
                      channelId={channel.id}
                      myChannelName={channel.name}
                      isPrivate={channel.isPrivate}
                    />
                  </Flex>
                ))
              ) : (
                <Box>내가 속한 채팅방이 없습니다.</Box>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
