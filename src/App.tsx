import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';
import Chats from './pages/chats';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/chats" element={<Chats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
