import React from 'react';
import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

const ChannelMemberItem = () => {
  return (
    <Flex mt="2" align="center">
      <Avatar size="md" name="userName" src="https://bit.ly/tioluwani-kolawole">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text fontSize="lg" color="black" ml="3" mt="1">
        이름
      </Text>
    </Flex>
  );
};

export default ChannelMemberItem;
