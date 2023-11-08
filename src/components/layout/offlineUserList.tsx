import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../states/atom';
import { useEffect, useState } from 'react';

const OfflineUserList = () => {
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const onlineUsers = onLine.users || [];
  const differentNames = all.filter((element) => {
    return !onlineUsers.includes(element.name);
  });

  const [offlineUsers, setOfflineUsers] = useState<string[]>([]);

  useEffect(() => {
    const offlineUserNames = differentNames.map((element) => element.name);
    if (JSON.stringify(offlineUserNames) !== JSON.stringify(offlineUsers)) {
      setOfflineUsers(offlineUserNames);
    }
  }, [differentNames, offlineUsers]);

  return (
    <div>
      <div>OfflineUserList</div>
      <div>Users: {offlineUsers.join(', ')}</div>
    </div>
  );
};

export default OfflineUserList;
