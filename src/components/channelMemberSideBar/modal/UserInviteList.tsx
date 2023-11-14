import { Center, Flex, Text } from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { useEffect } from 'react';
import ChannelModalUser from '../../channel/modal/ChannelModalUser';
import { User2 } from '../../../@types/user';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  userList: User2[];
}

const UserInviteList = ({ setUsers, userList }: Props) => {
  const { data: users, isLoading, addUser, userSet } = useUsers();

  useEffect(() => {
    setUsers(Array.from(userSet));
  }, [userSet]);

  const isIncluded = (id: string) => {
    return userSet.has(id);
  };

  const inviteUsers = users?.filter(
    (user) => !userList.some((u) => u.id === user.id),
  );

  const ModalUserItem = () => {
    if (isLoading) {
      return <Center>로딩중...</Center>;
    }
    if (inviteUsers?.length === 0) {
      return <Center>현재 모든 유저가 채팅방 안에 있습니다.</Center>;
    }
    return inviteUsers?.map((user) => (
      <ChannelModalUser
        key={user.id}
        user={user}
        addUser={addUser}
        isIncluded={isIncluded}
      />
    ));
  };

  return (
    <>
      <Flex mt="4" mb="1" gap="2" alignItems="center">
        <Text as="h3" fontWeight="bold">
          친구 초대
        </Text>
        <Text fontSize="sm" fontWeight="semibold">
          {userSet.size}
        </Text>
      </Flex>
      <Flex flexDir="column" gap="2" h={300} overflow="auto">
        <>{ModalUserItem()}</>
      </Flex>
    </>
  );
};

export default UserInviteList;
