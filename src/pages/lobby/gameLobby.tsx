import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
// import OnlineUserList from '../../components/layout/onineUserList';
// import UserList from '../../components/layout/userList';
import { getAllUsers } from '../../api';
import { Button } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../states/atom';

const GameLobby = () => {
  const accessToken = useRecoilValue(accessTokenState);

  const handleGetAllUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await getAllUsers(accessToken);
      console.log(res);
    } catch (e) {
      console.error(e);
      alert('사용자 정보를 가져오는데 실패했습니다.');
    }
  };

  return (
    <>
      <Button onClick={handleGetAllUsers}>모든유저보기</Button>
      {/* <UserList></UserList> */}
      <br></br>
      {/* <OnlineUserList /> */}
      <br></br>
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
    </>
  );
};

export default GameLobby;
