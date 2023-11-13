import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';
import ChannelPage from './pages/channel';
import Chats from './pages/chats';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ChannelPage />} />
          <Route path="/chats/:id" element={<Chats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
