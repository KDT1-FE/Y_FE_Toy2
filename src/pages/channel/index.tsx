import React from 'react';
import ChannelList from '../../components/channel';
import CreateChannelModal from '../../components/channel/modal/CreateChannelModal';
import { Box } from '@chakra-ui/react';

const ChannelPage = () => {
  return (
    <Box>
      <CreateChannelModal />
      <ChannelList />
    </Box>
  );
};

export default ChannelPage;
