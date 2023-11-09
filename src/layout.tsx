import { Container, Center, Flex } from '@chakra-ui/react';
import SideBar from './components/SideBar/SideBar';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Center>
      <Container maxW={1280}>
        <Flex w={1280}>
          <SideBar />
          {props.children}
        </Flex>
      </Container>
    </Center>
  );
};

export default Layout;
