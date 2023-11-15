import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import ChannelMemberItem from './ChannelMemberItem';
import UserInviteModal from './modal/UserInviteModal';
import ChannelExitDialog from './modal/ChannelExitDialog';
import useJoinLeaveChannels from '../../hooks/useJoinLeaveChannel';

const ChannelMemberSideBar = () => {
  const { id } = useParams();
  const chatId = id!;

  const { userList, setUserList } = useJoinLeaveChannels(chatId);

  return (
    <Box
      position="relative"
      w="18rem"
      h="100vh"
      bg="gray.50"
      p="20px"
      borderLeftColor="gray.400"
    >
      <Flex align="center" mt="10" justifyContent="space-between">
        <Box fontSize="1g"> 채팅 참여 목록 {userList.length}</Box>
        <UserInviteModal
          userList={userList}
          setUserList={setUserList}
          chatId={chatId}
        />
      </Flex>
      <Divider mt="1rem" borderColor={'gray.500'} />

      <VStack p="1rem" align="flex-start">
        {userList.map((user) => (
          <ChannelMemberItem
            key={user.id}
            userName={user.name || user.username}
            src={user.picture}
          />
        ))}
      </VStack>
      <ChannelExitDialog chatId={chatId} />
    </Box>
  );
};

export default ChannelMemberSideBar;
