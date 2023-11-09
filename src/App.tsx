import { Routes, Route } from "react-router-dom";
import AdminMain from "./pages/Main/user";
import Login from "./pages/Login";
import Example from "./pages/Example";
import Game from "./pages/Game";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<AdminMain />} />
        <Route path="/example" element={<Example />} />
        {/* Game 임시라우팅입니다 */}
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
};

export default App;
