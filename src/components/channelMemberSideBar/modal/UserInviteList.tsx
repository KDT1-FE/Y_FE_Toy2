import React, { useEffect, useState } from 'react';
import { Box, Center, Checkbox, Flex, useBoolean } from '@chakra-ui/react';
import socket from '../../../api/socket';
import ChannelMemberItem from '../ChannelMemberItem';
import { useUserData } from '../../../hooks/useUserData';

const UserInviteList = () => {
  const [isChecked, setIsChecked] = useBoolean(false);

  const userData = useUserData();

  // useEffect(() => {

  // }, []);

  return (
    <Box fontSize="4xl" textAlign="center">
      {userData.userNames.map((userName, i) => (
        <Flex
          align="center"
          px="50px"
          justify="space-between"
          // onClick={setIsChecked.toggle} //음...
          key={i}
        >
          <ChannelMemberItem
            userName={userName}
            src={userData.profilePictures[i]}
          />
          <Checkbox key={i} size="lg" color={'blue.500'} />
        </Flex>
      ))}
    </Box>
  );
};

export default UserInviteList;
