import { HashRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Lobby from './pages/lobby/Lobby';
import Chat from './pages/game/Chat';
import Night from './pages/game/Night';
import Hanging from './pages/game/Hanging';
import Result from './pages/game/Result';
import Role from './pages/game/Role';
import Vote from './pages/game/Vote';
import Reset from './pages/game/Reset';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/hanging" element={<Hanging />} />
        <Route path="/night" element={<Night />} />
        <Route path="/result" element={<Result />} />
        <Route path="/role" element={<Role />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
