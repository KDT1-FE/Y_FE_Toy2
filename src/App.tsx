import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';
import ChannelPage from './pages/channel';
import Chats from './pages/chats';
import MyChannels from './components/channel/MyChannels';
import ChannelList from './components/channel';
import Join from './pages/join';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ChannelPage />}>
            <Route path="/" element={<ChannelList />} />
            <Route path="/my-chats" element={<MyChannels />} />
          </Route>
          <Route path="/chats/:id" element={<Chats />} />
        </Route>
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
