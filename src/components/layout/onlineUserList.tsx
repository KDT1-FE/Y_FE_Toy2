import { useRecoilValue } from 'recoil';
import { onlineUserState } from '../../states/atom';

const OnlineUserList = () => {
  const socket = useRecoilValue(onlineUserState);
  const users = socket.users || [];
  console.log(users);

  return (
    <div>
      <div>OnlineUserList</div>
      <div>Users: {users.join(', ')}</div>
    </div>
  );
};

export default OnlineUserList;
