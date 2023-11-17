import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import OfflineUserList from '../../components/layout/offlineUserList';
import OnlineUserList from '../../components/layout/onlineUserList';
import UserLogout from '../login/userLogout';
import MyUserData from '../../components/layout/MyUserData';

const GameLobby = () => {
  return (
    <>
      <h2 style={{ fontWeight: 'bold' }}>1:1대화</h2>
      <MyUserData></MyUserData>
      <br></br>
      <OnlineUserList />
      <br></br>
      <OfflineUserList />
      <br />
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
      <br></br>
      <UserLogout />
    </>
  );
};

export default GameLobby;
