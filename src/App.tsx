import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';
import ChannelPage from './pages/channel';
import Chats from './pages/chats';
import Join from './pages/join';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ChannelPage />} />
          <Route path="/chats" element={<Chats />} />
        </Route>
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
