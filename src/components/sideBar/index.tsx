import React, { useState } from 'react';
import { Box, Text, Divider, Heading } from '@chakra-ui/react';
import { AddIcon, EditIcon, ChatIcon } from '@chakra-ui/icons';
import UserInviteModal from '../modal/UserInviteModal';
import Chats from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import MyChatListItem from './myChatListItem';
import axiosInstance from '../../utils/axiosInstance';
import { ResponseValue } from './myChats.types';

const fetchChats = async (): Promise<ResponseValue> => {
  const response = await axiosInstance.get('/chat');
  const data: { chats: ResponseValue } = await response.data;

  return data.chats;
};

const SideBar = () => {
  const [myChats, setMyChats] = useState(['코테', '면접', '운동', '공부']);

  // 내 대화목록 조회
  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery<ResponseValue>({
    queryKey: ['chats'],
    queryFn: () => fetchChats(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching chats</p>;
  }

  console.log('내챗/챗 데이터', chats);

  return (
    <Box w="18rem" h="100vh" bg="gray.50" color="black" p="10px" boxShadow="xl">
      <Text fontSize="4xl" fontWeight="extrabold" mb={6}>
        로고자리
      </Text>
      <Box color="#828C98">
        <Text mb={4}>
          <ChatIcon mr={2} />
          전체 채팅방 조회
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
        <Heading mb={6}>나의 채팅방</Heading>
        <Box>
          {chats &&
            chats.map((chat) => (
              <MyChatListItem key={chat.id} chatName={chat.name} />
            ))}
        </Box>
        <Chats />
        <UserInviteModal />
      </Box>
    </Box>
  );
};

export default SideBar;
