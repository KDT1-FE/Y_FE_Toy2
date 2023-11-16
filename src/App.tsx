import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./pages/Game";
import GameLists from "./components/Main/GameLists";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<GameLists />} />
        <Route path="/game" element={<Game />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
