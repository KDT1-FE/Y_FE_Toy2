import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../states/atom';

const OfflineUserList = () => {
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const onlineUsers = onLine.users || [];
  console.log(all);

  return (
    <div>
      <div>OfflineUserList</div>
      <div>Users: {onlineUsers.join(', ')}</div>
    </div>
  );
};

export default OfflineUserList;
