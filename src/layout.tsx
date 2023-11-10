import { Container, Center, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sideBar';

const Layout = () => {
  return (
    <Center>
      <Container maxW="container.xl">
        <Flex w="container.xl">
          <SideBar />
          <Outlet />
        </Flex>
      </Container>
    </Center>
  );
};

export default Layout;
