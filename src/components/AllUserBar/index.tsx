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

const allUserBar = () => {
  return (
    <Box flex="1">
      <Flex>
        <Box flex="3"></Box>
        <Stack direction="row" h="100vh" color="{white}">
          <Divider mt={3} orientation="vertical" borderColor={'gray.400'} />
        </Stack>
        <Box flex="1" w="280px" h="100vh" bg="gray.50" p={30}>
          <Text fontSize="1g" fontWeight="normal" color="gray.400" mt={10}>
            전체ㅡ 숫자
          </Text>
          <Divider mt={3} borderColor={'gray.500'} />
          <Flex mt={5}>
            <Stack direction="column" spacing={4}>
              <Avatar
                size="sm"
                name="Kent Dodds"
                src="https://bit.ly/kent-c-dodds"
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
            <Flex align="center" justify="center">
              <Text fontSize="sm" color="black" ml={3}>
                새콤달콤
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default allUserBar;
