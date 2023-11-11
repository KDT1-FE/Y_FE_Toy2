import { Button } from '@chakra-ui/react';
import { disconnectChattingSocket } from '../../api/socket';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { leaveGameRoom } from '../../api';
const LeaveGameRoom = (chatId: string) => {
  const navigate = useNavigate();
  const accessToken: any = useRecoilValue(accessTokenState);
  const id = chatId.chatId;
  const handleLeave = async () => {
    try {
      await leaveGameRoom(accessToken, id);
    } catch (error) {
      console.log(error);
    } finally {
      disconnectChattingSocket();
      navigate('/lobby');
    }
  };
  return (
    <Button colorScheme="red" onClick={handleLeave}>
      방 나가기
    </Button>
  );
};

export default LeaveGameRoom;
