import React from 'react';
import { Box, Text, Divider } from '@chakra-ui/react';
import { AddIcon, EditIcon, ChatIcon } from '@chakra-ui/icons';
import ChatListItem from './chatListItem/ChatListItem';
import UserInviteModal from '../modal/UserInviteModal';

const SideBar = () => {
  return (
    <Box w="18rem" h="100vh" bg="gray.50" color="black" p="10px" boxShadow="xl">
      <Text fontSize="4xl" fontWeight="extrabold" mb={6}>
        로고자리
      </Text>
      <Box color="#828C98">
        <Text mb={4}>
          <ChatIcon mr={2} />
          전체 채팅방 보기
        </Text>

        <Text mb={4}>
          <AddIcon mr={2} />
          새로운 채팅방 생성
        </Text>

        <Text mb={4}>
          <EditIcon mr={2} />
          개인 정보 수정
        </Text>
      </Box>
      <Divider my={50} />
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          나의 채팅방
        </Text>
        <Box>
          <ChatListItem />
        </Box>

        <UserInviteModal />
      </Box>
    </Box>
  );
};

export default SideBar;
