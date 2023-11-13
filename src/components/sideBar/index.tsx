import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Text,
  Divider,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { EditIcon, ChatIcon } from '@chakra-ui/icons';
import MyChannelItem from './MyChannelItem';
import { useMyChannels } from '../../hooks/useMyChannels';

const SideBar = () => {
  const { data: channels } = useMyChannels();

  return (
    <Box w="18rem" h="100vh" bg="gray.50" color="black" p="20px" boxShadow="xl">
      <Heading mb="1rem">로고자리</Heading>
      <Box color="#828C98">
        <ChakraLink as={ReactRouterLink} to="/" fontSize={'lg'} mb={4}>
          <ChatIcon mr={2} />
          전체 채팅방 조회
        </ChakraLink>

        <Text mb={4} fontSize={'lg'}>
          <EditIcon mr={2} />
          개인 정보 수정
        </Text>
      </Box>
      <Divider my={50} />
      <Box>
        <Heading mb={6}>나의 채팅방</Heading>
        <Box>
          {channels ? (
            channels.map((channel) => (
              <MyChannelItem
                key={channel.id}
                channelId={channel.id}
                myChannelName={channel.name}
                isPrivate={channel.isPrivate}
              />
            ))
          ) : (
            <Box>내가 속한 채팅방이 없습니다.</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
