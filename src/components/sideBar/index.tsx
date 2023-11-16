import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Text,
  Divider,
  Heading,
  VStack,
  Center,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { EditIcon, ChatIcon } from '@chakra-ui/icons';
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
    <Box
      w="18rem"
      position="fixed"
      h="100vh"
      bg="gray.50"
      color="black"
      p="20px"
      boxShadow="xl"
      top="50%"
      left="15%"
      transform="translate(-50%, -50%)"
    >
      <Heading my="2rem" size={'2xl'} color={'blue.400'}>
        smartalk
      </Heading>
      <Box color="#828C98" justifyContent="center">
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          fontSize={'lg'}
          _hover={{ color: '#191919', fontWeight: 'bold' }}
          transition={'all .2s ease-in-out'}
          textDecorationLine="none"
        >
          <ChatIcon mr={2} />
          전체 채팅방 조회
        </ChakraLink>
      </Box>
      <Divider my="2rem" />
      <Box>
        <Heading size="md" mb="2rem">
          나의 채팅방
        </Heading>
        <Box h="50vh" overflowY="auto">
          <>{channelBox()}</>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
