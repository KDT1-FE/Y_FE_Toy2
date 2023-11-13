import { Container, Center, Flex, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sideBar';

const Layout = () => {
  return (
    <Center>
      <Container maxW="container.xl">
        <Flex w="container.xl">
          <SideBar />
          <Box flex="1">
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </Center>
  );
};

export default Layout;
