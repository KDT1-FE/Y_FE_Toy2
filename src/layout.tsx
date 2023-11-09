import { Container, Center, Box, Flex } from '@chakra-ui/react';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Center>
      <Container maxW={1280}>
        <Flex w={1280}>
          <Box bg="blue" w="250px" h="100vh">
            사이드바
          </Box>
          {props.children}
        </Flex>
      </Container>
    </Center>
  );
};

export default Layout;
