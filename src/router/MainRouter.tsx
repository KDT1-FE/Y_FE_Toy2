import { Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/login/userLogin';
import UserJoin from '../pages/login/userJoin';
import GameLobby from '../pages/lobby/gameLobby';
import GameRoom from '../pages/room/gameRoom';

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/join" element={<UserJoin />} />
        <Route path="/lobby" element={<GameLobby />} />
        <Route path="/room/:id" element={<GameRoom />} />
      </Routes>
    </>
  );
};

export default MainRouter;
