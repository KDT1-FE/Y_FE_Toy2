import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Heading,
  VStack,
  Center,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import MyChannelItem from './MyChannelItem';
import { useMyChannels } from '../../hooks/useMyChannels';
import { useInviteData } from '../../hooks/useInviteData';

const SideBar = () => {
  const [myChannels, setmyChannels] = useState([]);
  const { data: channels, isLoading } = useMyChannels();
  const { myChannelList } = useInviteData();

  const channelBox = () => {
    if (isLoading) {
      return <Center>내 채팅 목록을 불러오는 중입니다.</Center>;
    }
    if (myChannelList?.length === 0 || channels?.length === 0) {
      return <Center>현재 참여중인 채팅방이 없습니다.</Center>;
    }
    return (myChannelList || channels)?.map((channel) => (
      <Box key={channel.id}>
        <MyChannelItem
          channelId={channel.id}
          myChannelName={channel.name}
          isPrivate={channel.isPrivate}
        />
      </Box>
    ));
  };

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
