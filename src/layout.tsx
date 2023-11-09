import { Container, Center, Flex } from '@chakra-ui/react';
import SideBar from './components/SideBar/SideBar';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Center>
      <Container maxW="container.xl">
        <Flex w="container.xl">
          <SideBar />
          {props.children}
        </Flex>
      </Container>
    </Center>
  );
};

export default Layout;
