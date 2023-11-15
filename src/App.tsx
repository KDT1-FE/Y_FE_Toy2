import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import Layout from './layout';
import ChannelPage from './pages/channel';
import Chats from './pages/chats';
import MyChannels from './components/channel/MyChannels';
import ChannelList from './components/channel';
import Join from './pages/join';
import Login from './pages/login';

function App() {
  const isAuthenticated = window.localStorage.getItem('accessToken') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route index element={<ChannelPage />} />
            <Route path="/" element={<ChannelList />} />
            <Route path="/my-chats" element={<MyChannels />} />
            <Route path="/chats/:id" element={<Chats />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
