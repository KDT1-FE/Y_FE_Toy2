import { useRecoilValue } from 'recoil';
import { onlineUserState } from '../../states/atom';

const OnlineUserList = () => {
  const socket = useRecoilValue(onlineUserState);
  console.log(socket);

  // 사용자 목록 추출
  const users = socket.users || [];

  return (
    <div>
      <div>OnlineUserList</div>
      <div>Users: {users.join(', ')}</div>
    </div>
  );
};

export default OnlineUserList;
