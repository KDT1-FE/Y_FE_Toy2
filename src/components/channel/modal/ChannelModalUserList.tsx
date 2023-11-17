import { Flex, Text } from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { useEffect } from 'react';
import ChannelModalUser from './ChannelModalUser';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChannelModalUserList = ({ setUsers }: Props) => {
  const { data: users, isLoading, addUser, userSet } = useUsers();
  const myId = localStorage.getItem('userId') as string;

  useEffect(() => {
    setUsers(Array.from(userSet));
  }, [userSet]);

  const isIncluded = (id: string) => {
    return userSet.has(id);
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
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          users
            ?.filter((user) => user.id !== myId)
            .map((user) => (
              <ChannelModalUser
                key={user.id}
                user={user}
                addUser={addUser}
                isIncluded={isIncluded}
              />
            ))
        )}
      </Flex>
    </>
  );
};

export default ChannelModalUserList;
