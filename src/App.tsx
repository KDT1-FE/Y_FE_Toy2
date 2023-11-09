import { Routes, Route } from "react-router-dom";
import AdminMain from "./pages/Main/user";
import Login from "./pages/Login";
import Example from "./pages/Example";
import Keyword from "./components/Game/Keyword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<AdminMain />} />
        <Route path="/example" element={<Example />} />
        <Route path="/keyword" element={<Keyword />} />
      </Routes>
    </>
  );
};

export default App;
