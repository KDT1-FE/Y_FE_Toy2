import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { useEffect } from 'react';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChannelModalUserList = ({ setUsers }: Props) => {
  const { data: users, isLoading, addUser, userSet } = useUsers();

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
          users?.map((user) => (
            <Box
              key={user.id}
              onClick={() => addUser(user.id)}
              display="flex"
              alignItems="center"
              gap="2"
              p="2"
              border={
                isIncluded(user.id) ? '2px solid #3182ce' : '2px solid #fff'
              }
              opacity={isIncluded(user.id) ? 1 : 0.5}
              bgColor={'gray.100'}
              borderRadius="md"
              cursor="pointer"
              transition={'all .15s ease-in-out'}
              _hover={{ opacity: 1 }}
            >
              <Image
                src={user.picture}
                alt={user.name}
                boxSize="40px"
                borderRadius="full"
              />
              <Text textAlign="center">{user.name}</Text>
            </Box>
          ))
        )}
      </Flex>
    </>
  );
};

export default ChannelModalUserList;
