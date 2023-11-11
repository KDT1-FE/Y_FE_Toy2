import { LockIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';

interface Props {
  myChannelName: string;
  isPrivate: boolean;
}

// 나중에 채널 아이디 받아서 Link 처리
const MyChannelItem = ({ myChannelName, isPrivate }: Props) => {
  return (
    <Flex align="center" mb="1rem">
      {isPrivate ? (
        <ViewIcon boxSize="1.4rem" />
      ) : (
        <LockIcon boxSize="1.5rem" />
      )}
      <Box ml="1rem">{myChannelName} </Box>
    </Flex>
  );
};

export default MyChannelItem;
