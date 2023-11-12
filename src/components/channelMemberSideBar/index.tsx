import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelMemberItem from './ChannelMemberItem';
import UserInviteModal from './modal/UserInviteModal';
import socket from '../../api/socket';
import { getUser } from '../../api/user';
import { User } from '../../@types/user';
import ChannelExitDialog from './modal/ChannelExitDialog';

interface UserIdDataProps {
  users: string[];
}

interface ResponseData {
  users: string[]; // 참여자들 id
  joiners: string[]; // 새로운 참여자 id
}

const ChannelMemberSideBar = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const { params } = useParams();
  const chatId: string = params!;

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
    socket.emit('join', (membersData: ResponseData) => {
      console.log('membersData', membersData);
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
        <Box fontSize="1g"> 채팅 참여 목록 {userList.length}</Box>
        <UserInviteModal setUserList={setUserList} chatId={chatId} />
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
      <ChannelExitDialog chatId={chatId} />
    </Box>
  );
};

export default ChannelMemberSideBar;
