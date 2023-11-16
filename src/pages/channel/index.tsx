import { Link, Outlet, useLocation } from 'react-router-dom';
import CreateChannelModal from '../../components/channel/modal/CreateChannelModal';
import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import ChannelSearchInput from '../../components/channel/ChannelSearchInput';
import ChannelSelector from '../../components/channel/ChannelSelector';
import AllUserBar from '../../components/allUserBar';

const ChannelPage = () => {
  const location = useLocation();

  const handleNavBarStyle = (path: string) => {
    return location.pathname === path ? '1' : '0.3';
  };

  return (
    <Grid gridTemplateColumns={'1fr 250px'} gap={4}>
      <GridItem display="flex" flexDirection="column" p={20}>
        <Flex gap="4">
          <Heading as="h1" fontSize="2xl" opacity={handleNavBarStyle('/')}>
            <Link to="/">전체 채팅</Link>
          </Heading>
          <Heading
            as="h1"
            fontSize="2xl"
            opacity={handleNavBarStyle('/my-chats')}
          >
            <Link to="/my-chats">나의 채팅</Link>
          </Heading>
        </Flex>
        <Text fontSize="sm" fontWeight="semibold" opacity="0.5" mb="4rem">
          개설된 모든 채팅방을 한 눈에 보세요
        </Text>
        <Flex gap="2">
          <CreateChannelModal />
          <ChannelSearchInput />
        </Flex>
        <ChannelSelector />
        <Outlet />
      </GridItem>
      <GridItem>
        <AllUserBar />
      </GridItem>
    </Grid>
  );
};

export default ChannelPage;
