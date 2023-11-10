import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import ChannelMemberItem from './ChannelMemberItem';

const ChannelMemberSideBar = () => {
  return (
    <Box w="18rem" h="100vh" bg="gray.50" p="20px" borderLeftColor="gray.400">
      <Flex align="center" mt="10" justifyContent="space-between">
        <Box fontSize="1g">현재 대화에 있는 사람</Box>
        <AddIcon boxSize={6} />
      </Flex>
      <Divider mt="4" borderColor={'gray.500'} />

      <VStack p="10px">
        <ChannelMemberItem />
      </VStack>
    </Box>
  );
};

export default ChannelMemberSideBar;
