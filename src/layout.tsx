import { Container, Center, Flex, Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sideBar';

const Layout = () => {
  return (
    <Center>
      <Container maxW="1440px" p={0} m={0}>
        <Grid gridTemplateColumns={'18rem 1fr'}>
          <GridItem>
            <SideBar />
          </GridItem>
          <GridItem>
            <Outlet />
          </GridItem>
        </Grid>
      </Container>
    </Center>
  );
};

export default Layout;
