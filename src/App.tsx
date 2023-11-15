import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Lobby from './pages/lobby/Lobby';
import Chat from './pages/game/Chat';
import Night from './pages/game/Night';
import Hanging from './pages/game/Hanging';
import Result from './pages/game/Result';
import Role from './pages/game/Role';
import Vote from './pages/game/Vote';

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
