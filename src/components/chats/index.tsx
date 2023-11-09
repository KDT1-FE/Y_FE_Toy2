import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Message } from '../../@types/message';

const Chat = ({ name, createdAt, text, picture }: Omit<Message, 'id'>) => {
  return (
    <Flex w="full" pt="2" pb="3">
      <Avatar
        name="Dan Abrahmov"
        src={picture}
        w="3.125rem"
        h="3.125rem"
        borderRadius="full"
        mr="2.5"
      ></Avatar>
      <Box>
        <Flex>
          <Text fontSize="md" fontWeight="semibold">
            {name}
          </Text>
          <Text
            alignSelf="end"
            ml="2"
            fontSize="xs"
            color="RGBA(0, 0, 0, 0.48)
    "
          >
            {createdAt}
          </Text>
        </Flex>

        <Text fontSize="0.85rem" margin="0" pt="0.5">
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default Chat;
