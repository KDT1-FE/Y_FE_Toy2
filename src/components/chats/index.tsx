import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { ChatData } from '../../@types/message';
import React from 'react';
import { useUser } from '../../hooks/useUser';

const Chat = ({ userId, createdAt, text }: Omit<ChatData, 'id'>) => {
  const { data } = useUser(userId);

  return (
    <Flex w="full" pt="2" pb="3">
      <Avatar
        src={data?.picture}
        w="3.125rem"
        h="3.125rem"
        borderRadius="full"
        mr="2.5"
      ></Avatar>
      <Box>
        <Flex>
          <Text fontSize="md" fontWeight="semibold">
            {data?.name}
          </Text>
          <Text
            alignSelf="end"
            ml="2"
            fontSize="xs"
            color="RGBA(0, 0, 0, 0.48)"
          >
            {createdAt.split('T')[0]}
          </Text>
        </Flex>

        <Text fontSize="0.85rem" margin="0" pt="0.5" w="31rem">
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default React.memo(Chat);
