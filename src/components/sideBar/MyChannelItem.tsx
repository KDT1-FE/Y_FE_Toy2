import { LockIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { io } from 'socket.io-client';
import { splitChannelName } from '../../utils';

interface Props {
  myChannelName: string;
  isPrivate: boolean;
  channelId: string;
}

const MyChannelItem = ({ myChannelName, isPrivate, channelId }: Props) => {
  const { title } = splitChannelName(myChannelName);
  const { id } = useParams();
  const isActive = channelId === id;

  return (
    <ChakraLink as={ReactRouterLink} to={`/chats/${channelId}`}>
      <Flex
        align="center"
        mx="1rem"
        my="0.5rem"
        p="0.5rem"
        bg={isActive ? 'blue.500' : 'gray.50'}
        color={isActive ? 'white' : 'black'}
      >
        {isPrivate ? (
          <LockIcon boxSize="1.5rem" />
        ) : (
          <ViewIcon boxSize="1.4rem" />
        )}
        <Box ml="1rem" mr="0.5rem">
          {title}
        </Box>
      </Flex>
    </ChakraLink>
  );
};

export default MyChannelItem;
