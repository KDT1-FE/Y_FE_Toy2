import { LockIcon, ViewIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Badge, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { io } from 'socket.io-client';
import { splitChannelName } from '../../utils';
import { CATEGORY_COLOR_SCHEMES } from '../../constants/channel';

interface Props {
  myChannelName: string;
  isPrivate: boolean;
  channelId: string;
}

// 나중에 채널 아이디 받아서 Link 처리
const MyChannelItem = ({ myChannelName, isPrivate, channelId }: Props) => {
  const { title, category } = splitChannelName(myChannelName);
  const { search } = useLocation();
  const location = search.slice(8);
  const isActive = channelId === location;

  // const socket = io(
  //   `${process.env.REACT_APP_API_URL}/chat?chatId=${channelId}`,
  //   {
  //     extraHeaders: {
  //       Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
  //       serverId: `${process.env.REACT_APP_SERVER_ID}`,
  //     },
  //   },
  // );

  return (
    <ChakraLink as={ReactRouterLink} to={`/chat?chatId=${channelId}`}>
      <Flex
        align="center"
        mx="1rem"
        my="0.5rem"
        p="0.5rem"
        bg={isActive ? 'blue.500' : 'gray.50'}
        color={isActive ? 'white' : 'black'}
      >
        {isPrivate ? (
          <ViewIcon boxSize="1.4rem" />
        ) : (
          <LockIcon boxSize="1.5rem" />
        )}
        <Box ml="1rem" mr="0.5rem">
          {title}
        </Box>
        <Badge colorScheme={CATEGORY_COLOR_SCHEMES[`${category}`]}>
          {category}
        </Badge>
      </Flex>
    </ChakraLink>
  );
};

export default MyChannelItem;
