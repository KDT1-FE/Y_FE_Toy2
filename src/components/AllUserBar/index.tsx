import React from 'react';
import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useUserData } from '../../hooks/useUserData';

const AllUserBar = () => {
  const userData = useUserData();

  return (
    <Box flex="1">
      <Flex>
        <Box flex="3"></Box>
        <Stack direction="row" h="100vh">
          <Divider mt="12" orientation="vertical" borderColor={'gray.400'} />
        </Stack>
        <Box flex="1" w="280px" h="100vh" bg="gray.50" p="6">
          <Text fontSize="1g" fontWeight="normal" color="gray.400" mt="8">
            전체ㅡ {userData.totalUsers}
          </Text>
          <Divider mt="4" borderColor={'gray.500'} />
          <Flex mt="4" align="center">
            <Stack direction="column" spacing="0">
              {userData.userNames.map((userName, index) => (
                <Flex key={index} mt="4">
                  <Avatar
                    size="sm"
                    name={userName}
                    src={userData.profilePictures[index]}
                  >
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                  <Text fontSize="sm" color="black" ml="3" mt="1">
                    {userName}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AllUserBar;
