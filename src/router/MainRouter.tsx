import { Outlet, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/login/userLogin';
import UserJoin from '../pages/login/userJoin';
import GameLobby from '../pages/lobby/gameLobby';
import GameRoom from '../pages/room/gameRoom';
import Test from '../pages/test/test';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { Grid } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Grid
      templateRows="auto 1fr auto"
      alignContent="center"
      justifyItems="center"
      gap={10}>
      <Header />
      <Outlet />
      <Footer />
    </Grid>
  );
}

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<UserLogin />} />
          <Route path="/join" element={<UserJoin />} />
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/room/:id" element={<GameRoom />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
