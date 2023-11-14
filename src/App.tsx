import { Routes, Route } from "react-router-dom";
import AdminMain from "./pages/Main/user";
import Login from "./pages/Login";
import Example from "./pages/Example";
import Game from "./pages/Game";
import GameLists from "./components/Main/GameLists";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<AdminMain />} />
        <Route path="/game" element={<Game />} />
        <Route path="/example" element={<Example />} />
        <Route path="/gameLists" element={<GameLists />} />
      </Routes>
    </>
  );
};

export default App;
