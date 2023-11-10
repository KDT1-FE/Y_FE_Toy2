import React, { useState } from 'react';
import { Box, Text, Divider, Heading } from '@chakra-ui/react';
import { AddIcon, EditIcon, ChatIcon } from '@chakra-ui/icons';
import UserInviteModal from './modal/UserInviteModal';
import { useQuery } from '@tanstack/react-query';
import MyChannelItem from './MyChannelItem';
import instance from '../../api/axios';
import { ResponseValue } from '../../@types/chat';

const fetchChannels = async () => {
  const response = await instance.get('/chat');
  const data: { chats: ResponseValue } = await response.data;

  return data.chats;
};

const SideBar = () => {
  // 내 대화목록 조회
  const {
    data: channels,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['channels'],
    queryFn: () => fetchChannels(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error();
  }

  console.log('내챗/챗 데이터', channels);

  return (
    <Box w="18rem" h="100vh" bg="gray.50" color="black" p="10px" boxShadow="xl">
      <Text fontSize="4xl" fontWeight="extrabold" mb="6px">
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
          {channels ? (
            channels.map((channel) => (
              <MyChannelItem key={channel.id} myChannelName={channel.name} />
            ))
          ) : (
            <Box>내가 속한 채팅방이 없습니다.</Box>
          )}
        </Box>
        <UserInviteModal />
      </Box>
    </Box>
  );
};

export default SideBar;
