import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
const GameRoom = () => {
  let { id } = useParams();
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      게임방{id}
      <Drawing />
      <CheckUsersInGameRoom chatId={id?.substring(1)}></CheckUsersInGameRoom>
    </div>
  );
};

export default GameRoom;
