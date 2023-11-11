import React from 'react';
import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';

interface MemberItemProps {
  userName: string;
  src?: string;
}

const ChannelMemberItem = ({ userName, src }: MemberItemProps) => {
  return (
    <Flex mt="2" align="center" bg={'yellow'}>
      <Avatar size="md" name={userName} src={src}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text fontSize="lg" color="black" ml="3" mt="1">
        {userName}
      </Text>
    </Flex>
  );
};

export default ChannelMemberItem;
