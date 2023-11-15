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
import { useAppSelector } from './hooks/redux';

function App() {
  const userId = useAppSelector((state) => state.userId);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/lobby" element={<Lobby userId={userId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/hanging/:id" element={<Hanging />} />
        <Route path="/night/:id" element={<Night />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/role/:id" element={<Role />} />
        <Route path="/vote/:id" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
