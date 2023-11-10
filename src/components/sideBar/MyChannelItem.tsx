import { Box } from '@chakra-ui/layout';
import React from 'react';

interface Props {
  myChannelName: string;
}

const MyChannelItem = ({ myChannelName }: Props) => {
  return <Box>{myChannelName}</Box>;
};

export default MyChannelItem;
