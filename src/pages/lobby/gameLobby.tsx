import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
// import OnlineUserList from '../../components/layout/onineUserList';
// import UserList from '../../components/layout/userList';
import { getAllUsers } from '../../api';
import { postRefresh } from '../../api';
import { Button } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { useNavigate } from 'react-router-dom';

const GameLobby = () => {
  const accessToken = useRecoilValue(accessTokenState); // hook 규칙으로 함수 외부에있어야함
  const setAccessToken = useSetRecoilState(accessTokenState); // hook 규칙으로 함수 외부에있어야함
  const navigate = useNavigate();

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

  const handlePostRefresh = async (e: React.FormEvent) => {
    e.preventDefault();

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken === null) {
      alert('로그인이 만료되었습니다.');
      navigate('/');
      return;
    }

    try {
      const res = await postRefresh(refreshToken);
      setAccessToken(res.data.accessToken);
      alert('토큰 재발급에 성공했습니다.');
    } catch (e) {
      console.error(e);
      alert('토큰 재발급에 실패했습니다.');
    }
  };

  return (
    <>
      <Button onClick={handlePostRefresh}>토큰재발급</Button>
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
