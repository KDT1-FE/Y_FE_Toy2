import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChannelMemberItem from './ChannelMemberItem';
import UserInviteModal from './modal/UserInviteModal';
import socket from '../../api/socket';
import { getUser } from '../../api/user';
import { User } from '../../@types/user';
import ChannelExitDialog from './modal/ChannelExitDialog';

interface UserIdDataProps {
  users: string[];
}

const ChannelMemberSideBar = () => {
  const [userList, setUserList] = useState<User[]>([]);

  // 현재 참여리스트 socket
  useEffect(() => {
    const getMemberInfo = async (users: string[]) => {
      const userListData = [];
      for (const id of users) {
        const response = await getUser(id);
        if (response) {
          const { name, picture } = response;
          userListData.push({
            id,
            name,
            picture,
          });
        }
      }
      setUserList(userListData);
    };
    socket.on('users-to-client', async (usersIdData: UserIdDataProps) => {
      const { users } = usersIdData;
      getMemberInfo(users);
    });
  }, []);

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
        <Box fontSize="1g"> 전체 {userList.length}</Box>
        <UserInviteModal />
      </Flex>
      <Divider mt="1rem" borderColor={'gray.500'} />

      <VStack p="1rem" align="flex-start">
        {userList.map((user) => (
          <ChannelMemberItem
            key={user.id}
            userName={user.name}
            src={user.picture}
          />
        ))}
      </VStack>
      <ChannelExitDialog />
    </Box>
  );
};

export default ChannelMemberSideBar;
