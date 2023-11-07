import { Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>메인</div>} />
      <Route path="*" element={<PageNotFound></PageNotFound>} />
    </Routes>
  );
}

export default App;
