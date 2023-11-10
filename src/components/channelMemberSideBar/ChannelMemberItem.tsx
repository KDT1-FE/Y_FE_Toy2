import React from 'react';
import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

const ChannelMemberItem = () => {
  return (
    <Flex mt="4">
      <Avatar size="sm" name="userName" src="https://bit.ly/tioluwani-kolawole">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text fontSize="sm" color="black" ml="3" mt="1">
        이름
      </Text>
    </Flex>
  );
};

export default ChannelMemberItem;
