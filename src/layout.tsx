import { Container, Center, Flex } from '@chakra-ui/react';
import SideBar from './components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

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
