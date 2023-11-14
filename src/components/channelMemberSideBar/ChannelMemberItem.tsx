import React from 'react';
import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

interface MemberItemProps {
  userName?: string;
  src?: string;
  isOnline: boolean;
}

const ChannelMemberItem = ({ userName, src, isOnline }: MemberItemProps) => {
  return (
    <Flex mt="2" align="center">
      <Avatar
        size="md"
        name={userName}
        src={src}
        filter={isOnline ? 'none' : 'grayscale(90%)'}
      >
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text fontSize="lg" color={isOnline ? 'black' : 'gray.300'} ml="3" mt="1">
        {userName}
      </Text>
    </Flex>
  );
};

export default ChannelMemberItem;
