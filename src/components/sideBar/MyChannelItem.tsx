import { LockIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
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
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(`chats/${channelId}`);
        location.reload();
      }}
    >
      <Flex
        overflow="hidden"
        align="center"
        mx="1rem"
        my="2px"
        p="4px"
        borderRadius="md"
        _hover={{
          bg: isActive ? 'blue.400' : 'blue.100',
          cursor: 'pointer',
        }}
        fontWeight={isActive ? 'bold' : 'normal'}
        bg={isActive ? 'blue.400' : 'gray.50'}
        color={isActive ? 'white' : 'black'}
      >
        {isPrivate ? <LockIcon boxSize="20px" /> : <Box boxSize="20px" />}
        <Box ml="1rem" mr="0.5rem" isTruncated>
          {title}
        </Box>
      </Flex>
    </Box>
  );
};

export default MyChannelItem;
