import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelMemberItem from './ChannelMemberItem';
import UserInviteModal from './modal/UserInviteModal';
import { getUser } from '../../api/user';
import { User2 } from '../../@types/user';
import ChannelExitDialog from './modal/ChannelExitDialog';
import { participateChannel } from '../../api/channel';
import serverSocket from '../../api/severSocket';
import socket from '../../api/socket';

interface UserIdDataProps {
  users: string[];
}

interface ResponseData {
  users: string[]; // 참여자들 id
  joiners: string[]; // 새로운 참여자 id
}

const ChannelMemberSideBar = () => {
  const [userList, setUserList] = useState<User2[]>([]);
  const { id } = useParams();
  const chatId: string = id!;

  useEffect(() => {
    socket.emit('users');
    socket.on('users-to-client', (messages: { users: string[] }) => {
      if (!messages) {
        console.log('땡!!!');
      }
      console.log('users-to-client', messages);
    });

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
    //현재 서버 접속자
    serverSocket.emit('users-server');
    serverSocket.on(
      'users-server-to-client',
      (usersIdData: UserIdDataProps) => {
        const { users } = usersIdData;
        // getMemberInfo(users);
      },
    );

    socket.on('leave', async (membersData: ResponseData) => {
      console.log('LEAVE', membersData);
    });
    socket.on('join', (messages: { users: string[]; joiners: string[] }) => {
      const members = messages.users;
      console.log('JOIN', messages);
    });

    return () => {
      socket.off('join');
      socket.off('users-server-to-client');
    };
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
