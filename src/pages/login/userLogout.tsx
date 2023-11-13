import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { disconnectLoginSocket } from '../../api/socket';

function UserLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      disconnectLoginSocket();
      localStorage.removeItem('id');
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
