import { LockIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
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
        overflow="hidden"
        align="center"
        mx="1rem"
        my="4px"
        p="4px"
        borderRadius="md"
        fontWeight={isActive ? 'bold' : 'normal'}
        bg={isActive ? 'blue.500' : 'gray.50'}
        color={isActive ? 'white' : 'black'}
      >
        {isPrivate ? <LockIcon boxSize="1.5rem" /> : <Box boxSize="1.4rem" />}
        <Box ml="1rem" mr="0.5rem" isTruncated>
          {title}
        </Box>
      </Flex>
    </ChakraLink>
  );
};

export default MyChannelItem;
