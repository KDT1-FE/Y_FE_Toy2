import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
const GameRoom = () => {
  let { id } = useParams();

  return (
    <>
      <LeaveGameRoom></LeaveGameRoom>
      <div style={{ padding: 20, textAlign: 'center' }}>
        게임방{id}
        <Drawing />
        <CheckUsersInGameRoom chatId={id?.substring(1)}></CheckUsersInGameRoom>
      </div>
    </>
  );
};

export default GameRoom;
