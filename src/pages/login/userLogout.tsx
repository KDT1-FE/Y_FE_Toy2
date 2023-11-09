import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../../constant';

function UserLogout() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const handleLogout = () => {
    try {
      const socket = io(`${SERVER_URL}/server`);
      socket.disconnect();

      localStorage.removeItem('refreshToken');
      setAccessToken('');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default UserLogout;
