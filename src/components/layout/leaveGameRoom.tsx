import { Button } from '@chakra-ui/react';
import { disconnectChattingSocket } from '../../api/socket';
import { useNavigate } from 'react-router-dom';
const LeaveGameRoom = () => {
  const navigate = useNavigate();
  const handleLeave = () => {
    try {
      disconnectChattingSocket();
      navigate('/lobby');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button colorScheme="red" onClick={handleLeave}>
      방 나가기
    </Button>
  );
};

export default LeaveGameRoom;
