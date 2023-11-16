import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./pages/Game";
import GameLists from "./components/Main/GameLists";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<GameLists />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
};

export default App;
