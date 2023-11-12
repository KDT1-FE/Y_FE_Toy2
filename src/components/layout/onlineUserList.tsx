import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../states/atom';
import userList from '../template/userList';

const OnlineUserList = () => {
  userList();
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const allOnlineUsers = onLine.users || [];
  const onlineUserListData = all.filter((element) => {
    return allOnlineUsers.includes(element.id);
  });

  return (
    <>
      <div>OnlineUserList</div>
      {onlineUserListData.map((element, key) => (
        <div key={key}>
          <p>{element.id}</p>
          <p>{element.name}</p>
          <p>{element.picture}</p>
        </div>
      ))}
    </>
  );
};

export default OnlineUserList;
